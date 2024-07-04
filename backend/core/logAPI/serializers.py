from rest_framework import serializers

from .models import Transaction, Reminder


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['id', 'date', 'amount', 'type', 'category', 'repeating', 'wallet']

    def create(self, validated_data):
        amount = validated_data['amount']
        if validated_data['type'] == 'EX':  # check if type is 'Expense'
            amount = -abs(amount)  # set amount to negative of the original amount
            validated_data['amount'] = amount
        instance = self.Meta.model.objects.create(**validated_data)
        return instance
    
    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.type = validated_data.get('type', instance.type)
        instance.category = validated_data.get('category', instance.category)
        instance.repeating = validated_data.get('repeating', instance.repeating)
        instance.wallet = validated_data.get('wallet', instance.wallet)

        if validated_data.get('type') == 'EX':
            instance.amount = -abs(validated_data.get('amount', instance.amount))

        instance.save()
        return instance