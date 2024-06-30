from django.db import models

from userAPI.models import User, Wallet

# Create your models here.

class SpendLog(models.Model):
    spend_date = models.DateField()
    description = models.CharField(max_length=128)
    amount_spent = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=32)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='spend_logs')

class EarnLog(models.Model):
    earn_date = models.DateField()
    description = models.CharField(max_length=128)
    amount_earned = models.DecimalField(max_digits=10, decimal_places=2)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='earn_logs')

class ReminderLog(models.Model):
    reminder_date = models.DateTimeField()
    description = models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reminder_logs')