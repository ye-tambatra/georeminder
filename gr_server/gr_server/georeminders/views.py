from rest_framework import viewsets
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework.permissions import IsAuthenticated

class UserRemindersViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user
        return Reminder.objects.filter(user=user)
