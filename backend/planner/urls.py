from django.urls import path
from . import views


urlpatterns = [
    path('catalogs', views.ListCreateCatalogs.as_view()),
    path('catalog/<int:pk>', views.DestroyCatalog.as_view()),
    path('constellations', views.ListCreateConstellations.as_view()),
    path('constellation/<int:pk>', views.DestroyConstellation.as_view()),
    path('telescopes', views.ListCreateTelescopes.as_view()),
    path('telescope/<int:pk>', views.DestroyTelescope.as_view()),
    path('cameras', views.ListCreateCameras.as_view()),
    path('camera/<int:pk>', views.DestroyCamera.as_view()),
    path('filters', views.ListCreateFilters.as_view()),
    path('filter/<int:pk>', views.DestroyFilter.as_view()),
    path('angles', views.ListCreateAngles.as_view()),
    path('angle/<int:pk>', views.DestroyAngle.as_view()),
]