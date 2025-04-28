from social_django.models import UserSocialAuth

def get_full_name(user):
    try:
        # Get the social account (GitHub or Google)
        social_account = user.social_auth.first()  # We can use `first()` because user can have multiple linked accounts
        provider = social_account.provider
        
        # Retrieve the name from the extra_data based on provider
        extra_data = social_account.extra_data
        
        if provider == 'github':
            # GitHub returns full name as 'name'
            full_name = extra_data.get('name', '')
        elif provider == 'google':
            # Google returns first_name as 'given_name' and last_name as 'family_name'
            first_name = extra_data.get('given_name', '')
            last_name = extra_data.get('family_name', '')
            full_name = f"{first_name} {last_name}".strip()
        else:
            full_name = ''
        
        return full_name

    except UserSocialAuth.DoesNotExist:
        return None
