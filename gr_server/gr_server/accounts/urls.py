from django.urls import path, include
from .views import GitHubLogin, GoogleLogin

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/login/github/', GitHubLogin.as_view(), name='github_login'),
    path('auth/login/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/registration/', include('dj_rest_auth.registration.urls'))
]