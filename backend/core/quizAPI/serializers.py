from rest_framework import serializers

from .models import Quiz, Question, Option, Play

# Create your serializers here.

class PlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Play
        fields = ['id', 'quiz', 'attempt', 'date', 'score']
        read_only_fields = ['attempt', 'date']  # Mark `attempt` and `date` as read-only

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_name', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'quiz_name', 'questions']