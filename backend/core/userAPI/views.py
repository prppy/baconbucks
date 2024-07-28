from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum
from datetime import date, timedelta

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
        user = request.user
        filter_type = request.query_params.get('type', 'EX')  # 'EX' for expense, 'EA' for income
        filter_period = request.query_params.get('period', 'all')  # 'week', 'month', 'year', 'all'
        wallet_id = request.query_params.get('wallet_id', None)  # Filter by wallet if provided

        today = date.today()
        start_date = self.get_start_date(filter_period, today)

        transactions = Transaction.objects.filter(
            wallet__user=user,
            date__gte=start_date,
            type=filter_type
        )
        if wallet_id and wallet_id != 'all':
            transactions = transactions.filter(wallet_id=wallet_id)

        # Net Worth Calculation
        wallets = Wallet.objects.filter(user=user)
        net_worth = sum(wallet.calculate_balance() for wallet in wallets)

        # Net Worth Trend
        net_worth_trend = []
        for i in range(1, 13):  # For the past 12 months, adjust as needed
            month_start = today.replace(day=1) - timedelta(days=30 * i)
            month_end = month_start.replace(day=1) + timedelta(days=31)
            monthly_balance = sum(
                wallet.calculate_balance()
                for wallet in wallets
                if wallet.transactions.filter(date__range=[month_start, month_end]).exists()
            )
            net_worth_trend.append({'date': month_start.strftime('%Y-%m'), 'balance': monthly_balance})

        # Transactions Breakdown
        category_breakdown = transactions.values('category').annotate(total=Sum('amount'))
        category_data = [
            {'category': cat['category'], 'amount': cat['total'], 'color': self.get_color_for_category(cat['category'])}
            for cat in category_breakdown
        ]

        return Response({
            'net_worth': net_worth,
            'net_worth_trend': net_worth_trend,
            'category_data': category_data
        })

    def get_start_date(self, period, today):
        if period == 'week':
            return today - timedelta(weeks=1)
        elif period == 'month':
            return today - timedelta(days=30)
        elif period == 'year':
            return today - timedelta(days=365)
        return date.min

    def get_color_for_category(self, category):
        color_map = {
            'Salary': '#ffcd56',
            'Transport': '#ff6384',
            'Groceries': '#36a2eb',
            'Food': '#4bc0c0',
            'Entertainment': '#9966ff',
            'Rent': '#c9cbcf',
            'Top Up': '#ff9f40'
        }
        return color_map.get(category, '#000000')  # Default color if category not in map