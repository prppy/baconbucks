from django.db import models
from django.db.models import Max

from userAPI.models import User

# Create your models here.

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=255)

class Question(models.Model):
    question_name = models.CharField(max_length=255)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')


class Option(models.Model):
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    

class Play(models.Model):
    attempt = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='plays')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='plays')
    bacoin = models.IntegerField(editable=False)

    class Meta:
        unique_together = ['attempt', 'user', 'quiz']

    def save(self, *args, **kwargs):
        if not self.pk:  # If the object is new
            # Get the latest attempt number for this user and quiz
            latest_attempt = Play.objects.filter(user=self.user, quiz=self.quiz).aggregate(Max('attempt'))['attempt__max']
            self.attempt = (latest_attempt or 0) + 1
        self.bacoin = self.score * 5
        super().save(*args, **kwargs)