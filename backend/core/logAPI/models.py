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

    date = models.DateField(blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, blank=False, null=False)
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES, blank=False, null=False)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions', blank=False, null=False)
    description = models.CharField(max_length=256, blank=True)
    
    def save(self, *args, **kwargs):
        # Remove repeating logic
        super().save(*args, **kwargs)


class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    name = models.CharField(max_length=64, blank=False, null=False)
    description = models.CharField(max_length=256)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)