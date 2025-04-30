import geopy
from geopy.geocoders import Nominatim

def get_location_name(latitude, longitude):
    """
    Reverse geocodes the given latitude and longitude to find a human-readable location name.
    """
    geolocator = Nominatim(user_agent="geo_reminder_server")
    try:
        location = geolocator.reverse((latitude, longitude), exactly_one=True, timeout=3)
        if location:
            address_parts = location.address.split(', ')
            address_without_country = ', '.join(address_parts[:-1])
            return address_without_country
        else:
            return "No location informations"
    except:
        return "No location informations"
