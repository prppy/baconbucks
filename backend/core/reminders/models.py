from django.db import models

class Reminder(models.Model):
    date = models.DateField()
    note = models.TextField()

    def __str__(self):
        return self.note
