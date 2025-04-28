from allauth.socialaccount.providers.oauth2.client import OAuth2Client

# This is fix for incompatibility between django-allauth==65.3.1 and dj-rest-auth==7.0.1
class CustomOAuth2Client(OAuth2Client):
    def __init__(self, 
                 request, 
                 consumer_key, 
                 consumer_secret, 
                 access_token_method, 
                 access_token_url, 
                 callback_url, 
                 _scope, # this is the fix
                 scope_delimiter=" ", 
                 headers=None, 
                 basic_auth=False):
        super().__init__(request, 
                         consumer_key, 
                         consumer_secret, 
                         access_token_method, 
                         access_token_url, 
                         callback_url, 
                         scope_delimiter, 
                         headers, 
                         basic_auth)