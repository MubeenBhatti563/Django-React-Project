from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NotesSerializer
from .models import Notes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    """
    Docstring for CreateUserView
    Creating user API
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    """
    Docstring for NoteListCreate
    Class for Creating and Retreiving Note APIs
    """
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    """
    Docstring for NoteDelete
    """
    queryset = Notes.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author=user)
    