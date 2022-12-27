from django.urls import path
from . import views


urlpatterns = [
    path('cameras', views.ListCreateCameras.as_view()),
    path('camera/<int:pk>', views.DestroyCamera.as_view()),
    path('telescopes', views.ListCreateTelescopes.as_view()),
    path('telescope/<int:pk>', views.DestroyTelescope.as_view()),
    path('flatt-reducs', views.ListCreateFlattReducs.as_view()),
    path('flatt-reduc/<int:pk>', views.DestroyFlattReduc.as_view()),
]