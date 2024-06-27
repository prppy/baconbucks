from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import TestView, UserView


urlpatterns = [
    path('test', TestView.as_view()),
    path('create-user/', UserView.as_view()),
    path('get-user', UserView.as_view()),
]

# localhost:8000/api/v1.0/user/test