from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import SettingsView


urlpatterns = [
    path('settings', SettingsView.as_view()),
    path('create-new-setting/', SettingsView.as_view()),
]

# localhost:8000/api/v1.0/app/