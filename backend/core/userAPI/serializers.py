from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Wallet


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    username = serializers.CharField(
        required=True,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    password = serializers.CharField(
        required=True,
        min_length=8,
        max_length=32,
        write_only=True
    )

    bacoin = serializers.IntegerField(default=0)
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = User.objects.create_user(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance
    
    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    
    def update_bacoin(self, instance, validated_data):
        instance.bacoin = validated_data.get('bacoin', instance.bacoin)
        instance.save()
        return instance
    
    class Meta:
        model = User
        fields = ('token', 'username', 'email', 'password', 'id', 'bacoin')

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('user', 'wallet_name', 'balance')

    def create(self, validated_data):
        user = validated_data.get('user')

        instance = Wallet.objects.create(
            user = user,
            wallet_name = validated_data.get('wallet_name'),
            balance = validated_data.get('balance', 0)
        )

        return instance
    
    def update_balance(self, instance, validated_data):
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance
    
    def update_name(self, instance, validated_data):
        instance.name = validated_data.get('wallet_name', instance.wallet_name)
        instance.save()
        return instance