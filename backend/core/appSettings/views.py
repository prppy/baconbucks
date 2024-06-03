from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class SettingsView(APIView):
    def get(self, request, format=None):
        print("API was called")
        return Response("slay", status=201)