from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .serializers import UserSerializer

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

            return Response(user_serializer.data, status=200)
        
            """
                will return a response like this, user's password is not visible. 
                access contains the actual access token for authentication.
                {
                    "user": {
                        "token": {
                            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTQzODQ4MSwiaWF0IjoxNzE5MzUyMDgxLCJqdGkiOiI4MjQ3NTgwMjgyNDY0NGFhYjYwMzdiM2VmMTYxY2JhNyIsInVzZXJfaWQiOjF9.t17T-_ac2UtAI5OtZn-jNKHfp9d6NbpV0LRxty_PUok",
                            "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MzUyMzgxLCJpYXQiOjE3MTkzNTIwODEsImp0aSI6ImU1ODdiMDFmOWQ5NzQzY2U4MDczMzNhZTJiMzQyNzY3IiwidXNlcl9pZCI6MX0.fIVh6cuXGw46IKtY4wH7VGRmRuP1GZvVxKZO-tUwnIE"
                        },
                        "email": "pojaroysg29@gmail.com"v,
                        "username": "parm",
                        "id": 1
                    }
                }
            """
        
        return Response({'msg': "err"}, status=400)
    
class UserLoginView(APIView):

        # to convert a user token to user data
    def get(self, request, format=None):
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid credentials", status=403)

        user = UserSerializer(request.user)
        return Response(user.data, status=200)
    
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
    
