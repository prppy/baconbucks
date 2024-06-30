from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


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

