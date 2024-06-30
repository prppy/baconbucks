from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import TestView, UserView, UserLoginView, WalletView, WalletBalanceView


urlpatterns = [
    path('test', TestView.as_view()),

    path('create-user/', UserView.as_view()),
    path('get-user', UserLoginView.as_view()),
    path('login-user/', UserLoginView.as_view()),
]