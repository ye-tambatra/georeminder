from django.db import models
from django.contrib.auth.models import User

class Reminder(models.Model):
    class TriggerType(models.TextChoices):
        EXIT = 'exit', 'Exit'
        ENTER = 'enter', 'Enter'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    trigger_type = models.CharField(max_length=5, choices=TriggerType.choices)
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reminders')
    location_name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True) #  blank=True, null=True for existing data
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True) #  blank=True, null=True for existing data
