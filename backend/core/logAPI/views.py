from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .serializers import SpendLogSerializer, EarnLogSerializer, ReminderLogSerializer
from .models import SpendLog, EarnLog, ReminderLog

class SpendLogView(APIView):
    def post(self, request, format=None):
        log_data = request.data
        log_serializer = SpendLogSerializer(data=log_data)

        if log_serializer.is_valid(raise_exception=False):
            log_serializer.save()
            return Response(log_serializer.data, status=201)

        return Response({'error': 'cannot make log'}, status=400)