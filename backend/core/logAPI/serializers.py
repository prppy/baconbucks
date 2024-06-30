from rest_framework import serializers

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