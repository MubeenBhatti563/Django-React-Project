from django.urls import path
from .views import NoteDelete, NoteListCreate

urlpatterns = [
    path("notes/", NoteListCreate.as_view(), name="list-notes"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note")
]
