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
    
class RandomQuizCreateView(APIView):
    def get(self, request, format=None):
        # Number of questions to include in the quiz
        num_questions = 3

        # Get all questions from the database
        all_questions = Question.objects.all()

        # Check if there are enough questions available
        if len(all_questions) < num_questions:
            return Response({"error": "Not enough questions available"}, status=400)

        # Randomly select questions
        selected_questions = random.sample(list(all_questions), num_questions)

        # Create a new quiz (optional, if you want to save it)
        new_quiz = Quiz.objects.create(quiz_name="Random Quiz")

        # Create or retrieve questions for this quiz (optional)
        for question in selected_questions:
            question.quiz = new_quiz
            question.save()

        # Serialize the selected questions
        serializer = QuestionSerializer(selected_questions, many=True)
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