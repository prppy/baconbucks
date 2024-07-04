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
    ]

    TYPE_CHOICES = [
        ("SP", "Spending"), 
        ("EX", "Expense")
    ]

    date = models.DateField()

    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    type = models.CharField(max_length=2, choices=TYPE_CHOICES)

    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)

    repeating = models.BooleanField(default=False)

    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')


class Reminder(models.Model):

    date = models.DateField()

    name = models.CharField(max_length=64)

    description = models.CharField(max_length=256)

    repeating = models.BooleanField(default=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reminders")

    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"