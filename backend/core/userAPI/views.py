from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .models import User, Wallet
from .serializers import UserSerializer, WalletSerializer

class TestView(APIView):
    def get(self, request, format=None):
        return Response("slay", status=201)
    
class UserView(APIView):
    # create new users
    def post(self, request, format=None):

        user_data = request.data
        user_serializer = UserSerializer(data=user_data)

        if user_serializer.is_valid(raise_exception=False):
            user_serializer.save()

            return Response(user_serializer.data, status=201)
        
        return Response(user_serializer.errors, status=400)
    
class UserGetView(APIView):
        # to convert a user token to user data
    def get(self, request, format=None):
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid credentials", status=403)

        user = UserSerializer(request.user)
        return Response(user.data, status=200)
    
class UserLoginView(APIView):
    # to authenticate users and log in
    def post(self, request, format=None):
        print("login class")

        user_obj = User.objects.filter(email=request.data['username']).first() or User.objects.filter(username=request.data['username']).first()

        if user_obj is not None:
            credentials = {
                'username': user_obj.username,
                'password': request.data['password']
            }
            user = authenticate(**credentials)

            if user and user.is_active:
                user_serializer = UserSerializer(user)
                return Response(user_serializer.data, status=200)

        return Response("invalid credentials", status=403)
    
class UserDeleteView(APIView):
    def delete(self, request, pk, format=None):
        pass

class WalletView(APIView):
    # create new wallet
    def post(self, request, format=None):
        wallet_data = request.data
        user = request.user
        wallet_data['user'] = user.id
        wallet_serializer = WalletSerializer(data=wallet_data)

        if wallet_serializer.is_valid(raise_exception=False):
            wallet_serializer.save()
            return Response(wallet_serializer.data, status=201)

        return Response(wallet_serializer.errors, status=400)
    
class WalletGetView(APIView):
    # get all wallets of current user
    def get(self, request, format=None):
        user = request.user
        wallets = Wallet.objects.filter(user=user)
        wallet_serializer = WalletSerializer(wallets, many=True)
        return Response(wallet_serializer.data, status=200)
    
class WalletGetSpecificView(APIView):
    # get a specific wallet of current user
    def get(self, request, format=None):
        user = request.user
        wallet_name = request.data.get('wallet_name')
        
        if not wallet_name:
            return Response({'error': 'Wallet name is required'}, status=400)
        
        try:
            wallet = Wallet.objects.get(user=user, wallet_name=wallet_name)
            wallet_serializer = WalletSerializer(wallet)
            return Response(wallet_serializer.data, status=200)
        except Wallet.DoesNotExist:
            return Response({'error': 'Wallet not found'}, status=404)
    
class WalletTotalBalanceView(APIView):
    # get total balance of all wallet of current user
    def get(self, request, format=None):
        user = request.user
        wallets = Wallet.objects.filter(user=user)
        wallet_serializer = WalletSerializer(wallets, many=True)
        
        total_balance = sum(wallet.calculate_balance() for wallet in wallets)
        
        response_data = {
            'wallets': wallet_serializer.data,
            'total_balance': total_balance,
        }
        return Response(response_data, status=200)
    
class WalletGetSpecificBalanceView(APIView):
    # get balance of a specific wallet of current user
    def get(self, request, format=None):
        user = request.user
        wallet_name = request.data.get('wallet_name')

        if not wallet_name:
            return Response({'error': 'Wallet name is required'}, status=400)
        
        try:
            wallet = Wallet.objects.get(user=user, wallet_name=wallet_name)
            balance = wallet.calculate_balance()
            return Response({'wallet_name': wallet.wallet_name, 'balance': balance}, status=200)
        except Wallet.DoesNotExist:
            return Response({'error': 'Wallet not found'}, status=404)
    
class WalletDeleteView(APIView):
    def delete(self, request, pk, format=None):
        pass