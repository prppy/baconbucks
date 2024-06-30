from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    bacoin = models.IntegerField(default=0)

class Wallet(models.Model):
    wallet_name = models.CharField(max_length=64)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallets')

    class Meta:
        unique_together = ('wallet_name', 'user')