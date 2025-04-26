from django.http import HttpResponseRedirect
from rest_framework_simplejwt.tokens import RefreshToken
from decouple import config


def generate_jwt_token(backend, user, response, *args, **kwargs):
    """
    After successful authentication, generate JWT tokens.
    Access token is sent in URL (short-lived),
    Refresh token is stored in HttpOnly secure cookie.
    """

    token = RefreshToken.for_user(user)
    access_token = str(token.access_token)
    refresh_token = str(token)


    frontend_redirect_url = f"{config("SOCIAL_AUTH_LOGIN_REDIRECT_URL")}?token={access_token}"
    response = HttpResponseRedirect(frontend_redirect_url)
    
    response.set_cookie(
        key=config('JWT_AUTH_COOKIE_NAME', default="refresh_token"),
        value=refresh_token,
        httponly=True,
        secure=config('JWT_AUTH_COOKIE_SECURE', default=None),
        samesite=config('JWT_AUTH_COOKIE_SAMESITE', default=None),
    )

    return response
