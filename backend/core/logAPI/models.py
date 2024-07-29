from django.db import models
from decimal import Decimal
from datetime import timedelta, date
from dateutil.relativedelta import relativedelta

from userAPI.models import User, Wallet

# Create your models here.

class Transaction(models.Model):
    CATEGORY_CHOICES = [
        ("SL", "Salary"),
        ("GR", "Groceries"),
        ("TR", "Transport"),
        ("RE", "Rent"),
        ("FD", "Food"),
        ("EN", "Entertainment"),
        ("TU", "TopUp")
    ]

    TYPE_CHOICES = [
        ("EA", "Earning"), 
        ("EX", "Expense")
    ]

    FREQUENCY_CHOICES = [
        ("N", "Never"),
        ("D", "Daily"),
        ("W", "Weekly"),
        ("M", "Monthly")
    ]

    date = models.DateField(blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, blank=False, null=False)
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES, blank=False, null=False)
    repeating = models.CharField(max_length=1, choices=FREQUENCY_CHOICES, blank=True, null=True)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions', blank=False, null=False)
    description = models.CharField(max_length=256, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.repeating != "N":
            self.create_repeating_transactions()

    def create_repeating_transactions(self):
        frequency_map = {
            "D": timedelta(days=1),
            "W": timedelta(weeks=1),
            "M": relativedelta(months=1)
        }
        
        delta = frequency_map.get(self.repeating)

        # Set the maximum date for the year
        end_of_year = self.date.replace(month=12, day=31)
        next_date = self.date + delta

        # Create transactions until the end of the year
        while next_date <= end_of_year:
            try:
                Transaction.objects.create(
                    date=next_date,
                    amount=self.amount,
                    type=self.type,
                    category=self.category,
                    repeating=self.repeating,
                    wallet=self.wallet,
                    description=self.description
                )
            except Exception as e:
                # Log or handle error
                print(f"Error creating transaction: {e}")
            
            # Move to the next occurrence
            next_date += delta


class Reminder(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    repeating = models.CharField(max_length=1, choices=Transaction.FREQUENCY_CHOICES, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reminders")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.repeating != "N":
            self.create_repeating_reminders()

    def create_repeating_reminders(self):
        frequency_map = {
            "D": timedelta(days=1),
            "W": timedelta(weeks=1),
            "M": relativedelta(months=1)
        }
        
        delta = frequency_map.get(self.repeating)
        
        next_date = self.date + delta

        while next_date.year == self.date.year:
            Reminder.objects.create(
                date=next_date,
                name=self.name,
                description=self.description,
                repeating=self.repeating,
                user=self.user
            )
            next_date += delta