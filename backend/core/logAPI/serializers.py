from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import SpendLog, EarnLog, ReminderLog

class SpendLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpendLog
        fields = ('wallet', 'description', 'amount_spent', 'category', 'spent_date')

class EarnLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EarnLog
        fields = ('wallet', 'description', 'amount_earned', 'earn_date')

class ReminderLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderLog
        fields = ('user', 'description', 'reminder_date')
