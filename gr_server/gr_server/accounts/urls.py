from django.urls import path, re_path
from .views import GitHubLogin, GoogleLogin, GetMeView
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LogoutView

urlpatterns = [
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    re_path('auth/token/refresh', get_refresh_view().as_view(), name="token_refresh"),
    path('auth/login/github/', GitHubLogin.as_view(), name='github_login'),
    path('auth/login/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/me', GetMeView.as_view(), name="me")
]