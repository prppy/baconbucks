from django.urls import path
from . import views

urlpatterns = [
    path('api/reminders/<str:date>/', views.reminders_for_date, name='reminders_for_date'),
    # Other paths
]

# localhost:8000/api/v1.0/user/test