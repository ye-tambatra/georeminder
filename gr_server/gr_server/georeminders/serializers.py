from rest_framework import serializers
from .models import Reminder

class ReminderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reminder
        fields = ['id', 'title', 'description', 'trigger_type', 'location_lat', 'location_lng', 'location_name']
        extra_kwargs = {
            'location_name': {'read_only': True},
            'description': {'required': False}  
        }

    def create(self, validated_data):
        location_name = validated_data.pop('location_name', None)
        location_lat = validated_data.get('location_lat')
        location_lng = validated_data.get('location_lng')

        # Get the user from the context (request)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user  # Set the user to the authenticated user

        reminder = Reminder(**validated_data)
        # TODO: handle location name
        reminder.location_name = "Default Location Name"  
        reminder.save()
        return reminder