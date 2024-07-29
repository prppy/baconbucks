from django.urls import path

from .views import TransactionCreateView, TransactionDetailView, TransactionListView, TransactionDeleteView, TransactionUpdateView, ReminderCreateView, ReminderDetailView, ReminderListView, ReminderDeleteView, ReminderUpdateView

urlpatterns = [
    path('create-trans/', TransactionCreateView.as_view()),
    path('get-trans/<int:pk>/', TransactionDetailView.as_view()),
    path('get-all-trans/<int:wallet_id>/', TransactionListView.as_view()),
    path('delete-trans/<int:pk>/', TransactionDeleteView.as_view()),
    path('update-trans/<int:pk>/', TransactionUpdateView.as_view()),
    path('create-rem/', ReminderCreateView.as_view()),
    path('get-rem/<int:pk>/', ReminderDetailView.as_view()),
    path('get-all-rem/<str:date>/', ReminderListView.as_view()),
    path('delete-rem/<int:pk>/', ReminderDeleteView.as_view()),
    path('update-rem/<int:pk>/', ReminderUpdateView.as_view()),
]

# localhost:8000/api/v1.0/log/