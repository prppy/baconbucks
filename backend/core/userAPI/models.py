from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

# Create your models here.

class UserManager(BaseUserManager):
    
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        
        user = self.model(
            username = username,
            email = self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username, 
            email, 
            password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):

    username = models.CharField(
        max_length=32,
        unique=True,
    )

    email = models.EmailField(
        unique=True, 
    )

    password = models.CharField(
        max_length=256,
    )

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    is_admin = models.BooleanField(default=False)

    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    last_login = models.DateTimeField(default=timezone.now)

    bacoin = models.IntegerField(
        default=0
    )

    objects = UserManager()

    USERNAME_FIELD = 'username'

    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = "Users"

    def has_perm(self, perm, obj=None):
        return self.is_staff
    
    def has_module_perms(self, app_label):
        return True
    

class Wallet(models.Model):
    wallet_name = models.CharField(max_length=64)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallets')

    class Meta:
        unique_together = ['wallet_name', 'user']

    def calculate_balance(self):
        transactions = self.transactions.all()
        total_balance = sum(transaction.amount for transaction in transactions)
        return total_balance