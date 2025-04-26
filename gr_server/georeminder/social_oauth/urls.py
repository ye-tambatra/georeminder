from django.urls import path, include
from .views import TokenRefreshView, LogoutView

urlpatterns = [
    path('', include('social_django.urls', namespace='social')),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
]