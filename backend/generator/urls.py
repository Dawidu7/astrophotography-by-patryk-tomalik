from django.urls import path
from .views import ListCreateCatalog, DestroyCatalog


urlpatterns = [
    path('', ListCreateCatalog.as_view()),
    path('catalog/<int:pk>', DestroyCatalog.as_view()),
]