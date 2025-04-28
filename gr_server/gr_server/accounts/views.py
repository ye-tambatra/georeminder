from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from decouple import config
from .utils import CustomOAuth2Client

class GoogleLogin(SocialLoginView): 
    adapter_class = GoogleOAuth2Adapter
    callback_url = config('GOOGLE_CALLBACK_URL')
    client_class = CustomOAuth2Client

class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = config('GITHUB_CALLBACK_URL')
    client_class = CustomOAuth2Client