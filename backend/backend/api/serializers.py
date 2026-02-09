from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Notes

class UserSerializer(serializers.ModelSerializer):
    """
    Serializers for User
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NotesSerializer(serializers.ModelSerializer):
    """
    Serializer for NotesSerializer
    """
    class Meta:
        model = Notes
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}