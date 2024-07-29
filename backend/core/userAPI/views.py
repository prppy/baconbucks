from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum
from datetime import date, timedelta, datetime

from .models import User, Wallet
from .serializers import UserSerializer, WalletSerializer, UserUpdateSerializer
from logAPI.models import Transaction

# Create your views here.

class TestView(APIView):
    def get(self, request, format=None):
        return Response("slay", status=201)
    
class UserSignUpView(APIView):
    # create new users
    def post(self, request, format=None):

        user_data = request.data
        user_serializer = UserSerializer(data=user_data)

        if user_serializer.is_valid(raise_exception=False):
            user = user_serializer.save()

            # create the user's first wallet!
            Wallet.objects.create(user=user, name="Wallet #1")

            return Response("User created successfully", status=201)
        
        return Response(user_serializer.errors, status=400)
    
class UserLoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')

        # check if username exists as an email or username
        try:
            user_obj = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                user_obj = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response("User does not exist", status=401)

        # Authenticate the user
        credentials = {
            'username': user_obj.username,
            'password': password
        }
        user = authenticate(**credentials)

        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(response_data, status=200)
        else:
            return Response("Username and password do not match", status=401)
    
class UserDetailView(APIView):
        # to user data from current user token
    def get(self, request, format=None):
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid credentials", status=403)

        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data, status=200)
    
class UserDeleteView(APIView):
    # delete current user 
        def delete(self, request, format=None):
            user = request.user
            # blacklist the user's tokens
            try:
                refresh_token = request.data["refresh"]
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                return Response({"error": str(e)}, status=400)
            
            user.delete()
            return Response("User deleted successfully", status=204)
    
class UserUpdateView(APIView):
    # update user details, like username, email or password
    def put(self, request, format=None):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

class WalletCreateView(APIView):
    # create new wallet
    def post(self, request, format=None):
        wallet_data = request.data.copy()
        wallet_data['user'] = request.user.id  # set the user field
        wallet_serializer = WalletSerializer(data=wallet_data)

        if wallet_serializer.is_valid(raise_exception=False):
            wallet_serializer.save()
            return Response("Wallet created successfully", status=201)

        return Response(wallet_serializer.errors, status=400)
    
class WalletDetailView(APIView):
    # get all wallets of current user
    def get(self, request, format=None):
        user = request.user

        try:
            wallets = Wallet.objects.filter(user=user)
            if not wallets.exists():
                return Response('Wallet not found', status=404)

            total_income = 0
            total_expense = 0

            for wallet in wallets:
                transactions = wallet.transactions.all()
                for transaction in transactions:
                    if transaction.type == 'EA':
                        total_income += transaction.amount
                    elif transaction.type == 'EX':
                        total_expense += transaction.amount

            total_balance = total_income - total_expense

            wallet_serializer = WalletSerializer(wallets, many=True)
            response_data = {
                'wallets': wallet_serializer.data,
                'total_income': total_income,
                'total_expense': total_expense,
                'total_balance': total_balance,
            }

            return Response(response_data, status=200)
        except Wallet.DoesNotExist:
            return Response('Wallet not found', status=404)
    
class WalletDeleteView(APIView):
    # delete current wallet
    def delete(self, request, pk, format=None):
        try:
            wallet = Wallet.objects.get(pk=pk)
            if wallet.user != request.user:
                return Response("Forbidden action", status=403)
            wallet.delete()
            return Response("Wallet deleted successfully", status=204)
        except Wallet.DoesNotExist:
            return Response("Wallet not found",status=404)
        
class WalletUpdateView(APIView):
    # update wallet details aka just wallet name
    def put(self, request, pk, format=None):
        try:
            wallet = Wallet.objects.get(pk=pk)
        except Wallet.DoesNotExist:
            return Response("Wallet not found.", status=404)

        # check if the wallet.user == request.user
        if wallet.user != request.user:
            return Response("You do not have permission to update this wallet.", status=403)

        wallet_data = request.data.copy()
        wallet_data['user'] = request.user.id
        serializer = WalletSerializer(wallet, data=wallet_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Wallet updated successfully"}, status=200)
        
        return Response(serializer.errors, status=400)


class StatisticsDashboardView(APIView):
    def get(self, request, format=None):
        time_filter = request.GET.get('time', 'month')
        wallet_filter = request.GET.get('wallet', 'all')

        # Determine the time range based on the filter
        end_date = datetime.now()
        if time_filter == 'week':
            start_date = end_date - timedelta(days=7)
        elif time_filter == 'month':
            start_date = end_date - timedelta(days=30)
        elif time_filter == 'year':
            start_date = end_date - timedelta(days=365)
        else:
            start_date = datetime.min

        # Filter transactions based on wallet and time range
        transactions = Transaction.objects.filter(date__gte=start_date, date__lt=end_date)
        if wallet_filter != 'all':
            transactions = transactions.filter(wallet__id=wallet_filter)

        # Calculate net worth
        total_income = transactions.filter(type='EA').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense = transactions.filter(type='EX').aggregate(Sum('amount'))['amount__sum'] or 0
        net_worth = total_income - total_expense

        # Prepare net worth history data
        net_worth_history = []
        cumulative_net_worth = 0
        for i in range(7):
            day = end_date - timedelta(days=i)
            day_transactions = transactions.filter(date=day.date())
            day_income = day_transactions.filter(type='EA').aggregate(Sum('amount'))['amount__sum'] or 0
            day_expense = day_transactions.filter(type='EX').aggregate(Sum('amount'))['amount__sum'] or 0
            cumulative_net_worth += (day_income - day_expense)
            net_worth_history.append({'label': day.strftime('%a'), 'value': cumulative_net_worth})

        net_worth_history.reverse()  # Ensure the history is in ascending order

        # Prepare piggy bank data
        piggy_bank = transactions.filter(type="EA").values('category').annotate(amount=Sum('amount')).order_by('-amount')

        # Convert category codes to names and colors
        categories = {
            "SL": {"name": "Salary", "color": "#ffccd5"},
            "GR": {"name": "Groceries", "color": "#ffb3c1"},
            "TR": {"name": "Transport", "color": "#ff8fa3"},
            "RE": {"name": "Rent", "color": "#ff758f"},
            "FD": {"name": "Food", "color": "#ff4d6d"},
            "EN": {"name": "Entertainment", "color": "#c9184a"},
            "TU": {"name": "TopUp", "color": "#A4133C"},
        }

        piggy_bank_data = []
        for item in piggy_bank:
            category = categories.get(item['category'], {"name": "Unknown", "color": "#95a5a6"})
            piggy_bank_data.append({
                'name': category['name'],
                'amount': item['amount'],
                'color': category['color']
            })

        # Get wallet options
        wallets = Wallet.objects.filter(user=request.user)
        wallet_options = WalletSerializer(wallets, many=True).data
        
        return Response({
            'net_worth': net_worth,
            'net_worth_history': net_worth_history,
            'piggy_bank': piggy_bank_data,
            'wallet_options': wallet_options,
        }, status=200)