from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.

class User(AbstractUser):
    bacoin = models.IntegerField(default=0)