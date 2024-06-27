from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, TokenError

from .serializers import UserSerializer

class TestView(APIView):
    def get(self, request, format=None):
        print("API was called")
        return Response("slay", status=201)
    
class UserView(APIView):
    # create new users
    def post(self, request, format=None):
        print("create new users")

        user_data = request.data

        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid(raise_exception=False):
            user_serializer.save()

            return Response({'user':user_serializer.data}, status=200)
        
            """
                will return a response like this, user's password is not visible. 
                access contains the actuall access token for authentication.
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
    
    def get(self, request, format=None):
        # to convert a user token to user data
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid credentials", status=403)

        user = UserSerializer(request.user)
        return Response(user.data, status=200)
    
