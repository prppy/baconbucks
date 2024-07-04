from django.contrib import admin
from django.urls import path, include

from .views import TransactionView, TransactionDeleteView, TransactionUpdateView

urlpatterns = [
    path('transactions/create-new-trans/', TransactionView.as_view()),
    path('transactions/<int:pk>/delete/', TransactionDeleteView.as_view()),
    path('transactions/<int:pk>/update/', TransactionUpdateView.as_view()),
]