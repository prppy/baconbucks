from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from datetime import date

from .models import User, Wallet
from logAPI.models import Transaction
from logAPI.serializers import ReminderSerializer, TransactionSerializer
from quizAPI.serializers import PlaySerializer

# Create your serializers here.

class WalletSerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField()
    balance = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ['id', 'name', 'user', 'transactions', 'balance']

    def get_transactions(self, obj):
        today = date.today()
        transactions = obj.transactions.filter(date__lte=today).order_by('-date')[:3]
        return TransactionSerializer(transactions, many=True).data

    def get_balance(self, obj):
        return obj.calculate_balance()
    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=8,
        write_only=True
    )
    confirm_password = serializers.CharField(
        min_length=8,
        write_only=True
    )
    bacoin = serializers.SerializerMethodField()

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('confirm_password', None)  # remove confirm_password from validated_data
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def get_bacoin(self, obj):
        return obj.calculate_bacoin()
    
    def validate_username(self, value):
        errors = []
        
        if len(value) > 32:
            errors.append("Username must be less than 32 characters.")

        if User.objects.filter(username=value).exists():
            errors.append("Username is in use.")

        if errors:
            raise serializers.ValidationError(errors)
        
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password', 'bacoin')

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password')

    def validate(self, data):
        if 'password' in data and data['password'] != data.pop('confirm_password', None):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance