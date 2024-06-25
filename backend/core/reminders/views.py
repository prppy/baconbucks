from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Reminder

def reminders_for_date(request, date):
    # Logic to fetch reminders based on date and return JSON response
    reminders = Reminder.objects.filter(date=date)
    reminders_data = [{'id': reminder.id, 'note': reminder.note} for reminder in reminders]
    return JsonResponse({'reminders': reminders_data})