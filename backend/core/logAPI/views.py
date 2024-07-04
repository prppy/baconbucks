from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import TransactionSerializer
from .models import Transaction
from userAPI.models import Wallet

# Create your views here.

class TransactionView(APIView):
    # create a new transaction
    def post(self, request, format=None):
        wallet_id = request.data.get('wallet')
        if not wallet_id:
            return Response({"error": "Wallet ID is required"}, status=400)
        
        try:
            wallet = Wallet.objects.get(id=wallet_id, user=request.user)
        except Wallet.DoesNotExist:
            return Response({"error": "Wallet was not found or does not belong to the authenticated user"}, status=404)

        transaction_serializer = TransactionSerializer(data=request.data)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
            # Update the wallet balance here if needed
            return Response(transaction_serializer.data, status=201)
        return Response(transaction_serializer.errors, status=400)
    
class TransactionDeleteView(APIView):
    # deletes transactions
    def delete(self, request, pk, format=None):
        try:
            transaction = Transaction.objects.get(pk=pk, wallet__user=request.user)
            transaction.delete()
            return Response({"message": "Transaction deleted successfully"}, status=200)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found or does not belong to the authenticated user"}, status=404)

class TransactionListView():
    # returns all transactions of the user in a list
    def get(self, request, format=None):
        transactions = Transaction.objects.filter(wallet__user=request.user)
        transaction_serializer = TransactionSerializer(transactions, many=True)
        return Response(transaction_serializer.data, status=200)


class TransactionUpdateView(APIView):
    # if user makes changes to the transaction
    def put(self, request, pk, format=None):
        try:
            transaction = Transaction.objects.get(pk=pk, wallet__user=request.user)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found or does not belong to the authenticated user"}, status=404)

        transaction_serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if transaction_serializer.is_valid():
            transaction_serializer.save()
            return Response(transaction_serializer.data, status=200)
        return Response(transaction_serializer.errors, status=400)