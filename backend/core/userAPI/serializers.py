from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from decimal import Decimal

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
        write_only=True
    )
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
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
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'bacoin', 'token')


class WalletSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    wallet_name = serializers.CharField(
        required = True,
    )

    balance = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ('user', 'id', 'wallet_name', 'balance')

    def create(self, validated_data):

        instance = Wallet.objects.create(
            user = validated_data.get('user'),
            wallet_name = validated_data.get('wallet_name'),
        )

        return instance
    
    def get_balance(self, obj):
        return obj.calculate_balance()
    
    def update_name(self, instance, validated_data):
        instance.name = validated_data.get('wallet_name', instance.wallet_name)
        instance.save()
        return instance