from django.urls import path

from .views import TestView, UserView, UserGetView, UserLoginView, WalletView, WalletGetView, WalletGetSpecificView, WalletTotalBalanceView


urlpatterns = [
    path('test', TestView.as_view()),
    path('create-user/', UserView.as_view()),
    path('get-user', UserGetView.as_view()),
    path('login-user/', UserLoginView.as_view()),
    path('create-wallet/', WalletView.as_view()),
    path('get-wallets', WalletGetView.as_view()),
    path('get-specific-wallet', WalletGetSpecificView.as_view()),
    path('get-total-balance', WalletTotalBalanceView.as_view()),
]