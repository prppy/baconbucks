from django.urls import path

from .views import TestView, UserSignUpView, UserLoginView, UserDetailView, UserDeleteView, UserUpdateView, WalletCreateView, WalletDetailView, WalletDeleteView, WalletUpdateView

urlpatterns = [
    path('test/', TestView.as_view()),
    path('signup/', UserSignUpView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('get-user/', UserDetailView.as_view()),
    path('delete-user/', UserDeleteView.as_view()),
    path('update-user/', UserUpdateView.as_view()),
    path('create-wallet/', WalletCreateView.as_view()),
    path('get-wallet/', WalletDetailView.as_view()),
    path('delete-wallet/<int:pk>/', WalletDeleteView.as_view()),
    path('update-wallet/<int:pk>/', WalletUpdateView.as_view()),
]

# localhost:8000/api/v1.0/user/