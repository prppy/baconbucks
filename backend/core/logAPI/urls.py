from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import SpendLogView


urlpatterns = [
    path('create-spend-log/', SpendLogView.as_view()),
]