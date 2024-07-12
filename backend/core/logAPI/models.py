from django.db import models
from decimal import Decimal

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
        ("D", "Daily"),
        ("W", "Weekly"),
        ("M", "Monthly"),
        ("Y", "Yearly"),
    ]

    date = models.DateField(blank=False, null=False)

    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))

    type = models.CharField(max_length=2, choices=TYPE_CHOICES, blank=False, null=False)

    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES,  blank=False, null=False)

    repeating = models.BooleanField(default=False)

    frequency = models.CharField(max_length=1, choices=FREQUENCY_CHOICES, blank=True, null=True)

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions', blank=False, null=False)

    def save(self, *args, **kwargs):
        if self.repeating and not self.frequency:
            raise ValueError("If repeating is True, frequency must be specified.")
        super().save(*args, **kwargs)

class Reminder(models.Model):

    FREQUENCY_CHOICES = [
        ("D", "Daily"),
        ("W", "Weekly"),
        ("M", "Monthly"),
        ("Y", "Yearly"),
    ]

    date = models.DateField()

    name = models.CharField(max_length=64)

    description = models.CharField(max_length=256)

    repeating = models.BooleanField(default=False)

    frequency = models.CharField(max_length=1, choices=FREQUENCY_CHOICES, blank=True, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reminders")

    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"

    def save(self, *args, **kwargs):
        if self.repeating and not self.frequency:
            raise ValueError("If repeating is True, frequency must be specified.")
        super().save(*args, **kwargs)