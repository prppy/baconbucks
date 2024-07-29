from rest_framework import serializers
from decimal import Decimal

from .models import Transaction, Reminder

# Create your serializers here.

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'date', 'amount', 'type', 'category', 'wallet', 'description']

    def create(self, validated_data):
        amount = validated_data.get('amount', Decimal("0.00"))
        if validated_data['type'] == 'EX':
            amount = -abs(amount)
            validated_data['amount'] = amount
        instance = Transaction.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.type = validated_data.get('type', instance.type)
        instance.category = validated_data.get('category', instance.category)
        instance.wallet = validated_data.get('wallet', instance.wallet)
        instance.description = validated_data.get('description', instance.description)

        if validated_data.get('type') == 'EX':
            instance.amount = -abs(validated_data.get('amount', instance.amount))

        instance.save()
        return instance

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'date', 'name', 'description', 'user']

    def create(self, validated_data):
        instance = Reminder.objects.create(**validated_data)
        return instance
    
    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance