from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRemindersViewSet

router = DefaultRouter()
router.register(r'users/reminders', UserRemindersViewSet, basename='user-reminders')

urlpatterns = [
    path('', include(router.urls)),
]