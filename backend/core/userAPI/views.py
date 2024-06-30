from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .serializers import UserSerializer, WalletSerializer
from .models import Wallet, User

class TestView(APIView):
    def get(self, request, format=None):
        print("API was called")
        return Response("slay", status=201)
    

class UserView(APIView):

    # create new users
    def post(self, request, format=None):
        user_data = request.data
        user_serializer = UserSerializer(data=user_data)

        if user_serializer.is_valid(raise_exception=False):
            user_serializer.save()
            return Response(user_serializer.data, status=201)
        
        return Response({'msg': "err"}, status=400)
    

class UserLoginView(APIView):

    # to convert a user token to user data
    def get(self, request, format=None):
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid credentials", status=403)

        user = UserSerializer(request.user)
        return Response(user.data, status=200)
    
    # to log in user
    def post(self, request, format=None):
        print("login class")

        user_obj = User.objects.filter(email=request.data['username']) or User.objects.filter(username=request.data['username'])

        if user_obj is not None:
            credentials = {
                'username': user_obj.username,
                'password': request.data['password']
            }
            
            user = authenticate(**credentials)

            if user and user.is_active:
                user_serializer = UserSerializer(user)
                return Response(user_serializer.data, status=200)
            
        return Response({"error": "Invalid credentials"}, status=401)


class WalletView(APIView):

    def post(self, request, format=None):
        wallet_data = request.data
        wallet_serializer = WalletSerializer(data=wallet_data)

        if wallet_serializer.is_valid(raise_exception=False):
            wallet_serializer.save()
            return Response(wallet_serializer.data, status=201)

        return Response({'error': 'cannot make wallet'}, status=400)
    
class WalletBalanceView(APIView):

    def get(self, request, format=None):
        user = request.user

        wallets = Wallet.objects.filter(user=user)
        wallet_serializer = WalletSerializer(wallets, many=True)

        # Calculate total balance across all wallets
        total_balance = sum(wallet.balance for wallet in wallets)

        response_data = {
            'wallets': wallet_serializer.data,
            'total_balance': total_balance,
        }
        return Response(response_data, status=200)