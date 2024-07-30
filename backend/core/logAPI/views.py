from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime

from .serializers import TransactionSerializer, ReminderSerializer
from .models import Transaction, Reminder
from userAPI.models import User, Wallet

# Create your views here.

class TransactionCreateView(APIView):
    # create a new transaction
    def post(self, request, format=None):
        wallet_id = request.data.get('wallet')
        if not wallet_id:
            return Response("Wallet ID field is required.", status=400)
        
        try:
            wallet = Wallet.objects.get(id=wallet_id, user=request.user)
        except Wallet.DoesNotExist:
            return Response("Wallet was not found or does not belong to the authenticated user", status=404)

        transaction_data = request.data.copy()
        transaction_data['wallet'] = wallet.id
        transaction_serializer = TransactionSerializer(data=transaction_data)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
            return Response("Transaction created successfully", status=201)
        return Response(transaction_serializer.errors, status=400)

class TransactionDetailView(APIView):
    # view details of this transaction
    def get(self, request, pk, format=None):
        try:
            transaction = Transaction.objects.get(pk=pk, wallet__user=request.user)
        except Transaction.DoesNotExist:
            return Response("Transaction not found.", status=404)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)

class TransactionListView(APIView):
    # see all transactions of this wallet
    def get(self, request, wallet_id, format=None):
        transactions = Transaction.objects.filter(wallet__id=wallet_id, wallet__user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class TransactionDeleteView(APIView):
    # deletes transactions
    def delete(self, request, pk, format=None):
        try:
            transaction = Transaction.objects.get(pk=pk, wallet__user=request.user)
            transaction.delete()
            return Response("Transaction deleted successfully", status=200)
        except Transaction.DoesNotExist:
            return Response("Transaction not found or does not belong to the authenticated user", status=404)

class TransactionUpdateView(APIView):
    def put(self, request, pk, format=None):
        try:
            transaction = Transaction.objects.get(pk=pk, wallet__user=request.user)
        except Transaction.DoesNotExist:
            return Response("Transaction not found or does not belong to the authenticated user", status=404)

        transaction_serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
            return Response(transaction_serializer.data, status=200)
        return Response(transaction_serializer.errors, status=400)


class ReminderCreateView(APIView):
    # create new reminder
    def post(self, request, format=None):
        reminder_data = request.data.copy()
        reminder_data['user'] = request.user.id
        reminder_serializer = ReminderSerializer(data=reminder_data)
        if reminder_serializer.is_valid():
            reminder_serializer.save()
            return Response("Reminder created successfully", status=201)
        return Response(reminder_serializer.errors, status=400)

class ReminderDetailView(APIView):
    # view details of this reminder
    def get(self, request, pk, format=None):
        try:
            reminder = Reminder.objects.get(pk=pk, user=request.user)
        except Reminder.DoesNotExist:
            return Response("Reminder not found.", status=404)
        serializer = ReminderSerializer(reminder)
        return Response(serializer.data)

class ReminderListView(APIView):
    # see all reminders of this day
    def get(self, request, date, format=None):
        try:
            selected_date = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response("Invalid date format. Please use YYYY-MM-DD.", status=400)

        reminders = Reminder.objects.filter(date=selected_date, user=request.user)

        if not reminders:
            return Response("No reminders found for this date.", status=404)

        serializer = ReminderSerializer(reminders, many=True)
        return Response(serializer.data, status=200)

class ReminderDeleteView(APIView):
    # delete this reminder
    def delete(self, request, pk, format=None):
        try:
            reminder = Reminder.objects.get(pk=pk, user=request.user)
            reminder.delete()
            return Response("Reminder deleted successfully", status=200)
        except Reminder.DoesNotExist:
            return Response("Reminder not found or does not belong to the authenticated user", status=404)

class ReminderUpdateView(APIView):
    # update reminder details
    def put(self, request, pk, format=None):
        try:
            reminder = Reminder.objects.get(pk=pk, user=request.user)
        except Reminder.DoesNotExist:
            return Response("Reminder not found or does not belong to the authenticated user", status=404)

        reminder_serializer = ReminderSerializer(reminder, data=request.data, partial=True)
        if reminder_serializer.is_valid():
            reminder_serializer.save()
            return Response(reminder_serializer.data, status=200)
        return Response(reminder_serializer.errors, status=400)