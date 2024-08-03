from django.urls import path

from .views import QuizDetailView,RandomQuizCreateView, PlayCreateView, PlayListView

urlpatterns = [
    path('get-quiz/<int:pk>/', QuizDetailView.as_view()),
    path('get-random-quiz/', RandomQuizCreateView.as_view()),
    path('create-play/', PlayCreateView.as_view()),
    path('get-play-list/', PlayListView.as_view()),
]

# localhost:8000/api/v1.0/quiz/