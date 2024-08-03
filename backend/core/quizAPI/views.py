from rest_framework.views import APIView
from rest_framework.response import Response
import random

from .models import Quiz, Question, Play
from .serializers import QuizSerializer, QuestionSerializer, PlaySerializer

# Create your views here.

class QuizDetailView(APIView):
    # view details of this quiz
    def get(self, request, pk, format=None):
        try:
            quiz = Quiz.objects.get(pk=pk)
        except Quiz.DoesNotExist:
            return Response("Quiz not found.", status=404)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
       
class PlayCreateView(APIView):
    # Create new play
    def post(self, request, format=None):
        serializer = PlaySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # `attempt` will be handled by the model's `save` method
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class PlayListView(APIView):
    # see all plays of this user
    def get(self, request, format=None):
        plays = Play.objects.filter(user=request.user)
        serializer = PlaySerializer(plays, many=True)
        return Response(serializer.data)