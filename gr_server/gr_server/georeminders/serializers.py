from rest_framework import serializers
from .models import Reminder

class ReminderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reminder
        fields = '__all__'
        extra_kwargs = {'location_name': {'read_only': True}}

    def create(self, validated_data):
        location_name = validated_data.pop('location_name', None)
        location_lat = validated_data.get('location_lat')
        location_lng = validated_data.get('location_lng')
        reminder = Reminder(**validated_data)
        # TODO: handle location name
        reminder.location_name = "Default Location Name"  
        reminder.save()
        return reminder