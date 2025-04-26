from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from decouple import config

class TokenRefreshView(APIView):
    """
    Refresh the access token using the refresh token from the cookie.
    Rotate refresh tokens and blacklist the old one.
    """

    def post(self, request):
        refresh_token_from_cookie = request.COOKIES.get(config('JWT_AUTH_COOKIE_NAME', default="refresh_token"))

        if not refresh_token_from_cookie:
            return Response({'error': 'Refresh token missing.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            # Verify the old refresh token
            old_refresh = RefreshToken(refresh_token_from_cookie)

            # Blacklist the old refresh token
            old_refresh.blacklist()

            # Generate a new refresh token
            new_refresh = RefreshToken.for_user(request.user)
            access_token = str(new_refresh.access_token)
            refresh_token = str(new_refresh)

            # Store the new refresh token in the cookie
            response = Response({'message': 'Access token refreshed successfully'}, status=status.HTTP_200_OK)
            response.set_cookie(
                key=config('JWT_AUTH_COOKIE_NAME', default="refresh_token"),
                value=str(refresh_token),
                httponly=True,
                secure=config('JWT_AUTH_COOKIE_SECURE', default=None),
                samesite=config('JWT_AUTH_COOKIE_SAMESITE', default=None),
            )

            return Response({'access_token': access_token})
        except TokenError:
            return Response({'error': 'Invalid or expired refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutView(APIView):
    """
    Logout user by blacklisting the refresh token and clearing cookie.
    """

    def post(self, request):
        refresh_token_from_cookie = request.COOKIES.get(config('JWT_AUTH_COOKIE_NAME', default="refresh_token"))

        if refresh_token_from_cookie:
            try:
                token = RefreshToken(refresh_token_from_cookie)
                token.blacklist()
            except TokenError:
                pass  # Token might already be expired

        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie(config('JWT_AUTH_COOKIE_NAME', default="refresh_token"))
        return response
