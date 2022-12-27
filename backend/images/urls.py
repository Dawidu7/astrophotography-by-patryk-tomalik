from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListCreateImages.as_view()),
    path('image/<int:pk>', views.RetrieveUpdateDestroyImage.as_view()),
    
    path('optics', views.ListCreateOptics.as_view()),
    path('optic/<int:pk>', views.DestroyOptic.as_view()),
    
    path('cameras', views.ListCreateCameras.as_view()),
    path('camera/<int:pk>', views.DestroyCamera.as_view()),
    
    path('mounts', views.ListCreateMounts.as_view()),
    path('mount/<int:pk>', views.DestroyMount.as_view()),
    
    path('filters', views.ListCreateFilters.as_view()),
    path('filter/<int:pk>', views.DestroyFilter.as_view()),
    
    path('exposure-details', views.ListCreateExposureDetails.as_view()),
    path('exposure-detail/<int:pk>', views.DestroyExposureDetail.as_view()),
    
    path('acquisitions', views.ListCreateAcquisitions.as_view()),
    path('acquisition/<int:pk>', views.DestroyAcquisition.as_view()),
    
    path('processings', views.ListCreateProcessings.as_view()),
    path('processing/<int:pk>', views.DestroyProcessing.as_view()),
]