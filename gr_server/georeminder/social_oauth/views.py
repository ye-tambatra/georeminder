from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from decouple import config
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

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

            # Get the user from the old refresh token
            user_id = old_refresh['user_id']
            User = get_user_model()
            user = User.objects.get(id=user_id)

            # Generate a new refresh token
            new_refresh = RefreshToken.for_user(user)
            access_token = str(new_refresh.access_token)
            refresh_token = str(new_refresh)

            # Blacklist the old refresh token
            old_refresh.blacklist()

            # Store the new refresh token in the cookie
            response = Response({
                'message': 'Access token refreshed successfully',
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            }, status=status.HTTP_200_OK)
            response.set_cookie(
                key=config('JWT_AUTH_COOKIE_NAME', default="refresh_token"),
                value=str(refresh_token),
                httponly=True,
                secure=config('JWT_AUTH_COOKIE_SECURE', default=None),
                samesite=config('JWT_AUTH_COOKIE_SAMESITE', default=None),
            )

            return response
        except TokenError as e:
            print(f"TokenError: {e}")
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


class MeView(APIView):
    """
    Get the authenticated user's information.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_info = {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        return Response(user_info, status=status.HTTP_200_OK)
