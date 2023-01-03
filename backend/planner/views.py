from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from . import models, serializers


# Create your views here.
class ListCreateCatalogs(ListCreateAPIView):
    queryset = models.Catalog.objects.all()
    serializer_class = serializers.CatalogSerializer

class DestroyCatalog(DestroyAPIView):
    queryset = models.Catalog.objects.all()
    serializer_class = serializers.CatalogSerializer
    
class ListCreateConstellations(ListCreateAPIView):
    queryset = models.Constellation.objects.all()
    serializer_class = serializers.ConstellationSerializer

class DestroyConstellation(DestroyAPIView):
    queryset = models.Constellation.objects.all()
    serializer_class = serializers.ConstellationSerializer

class ListCreateTelescopes(ListCreateAPIView):
    queryset = models.Telescope.objects.all()
    serializer_class = serializers.TelescopeSerializer

class DestroyTelescope(DestroyAPIView):
    queryset = models.Telescope.objects.all()
    serializer_class = serializers.TelescopeSerializer

class ListCreateCameras(ListCreateAPIView):
    queryset = models.Camera.objects.all()
    serializer_class = serializers.CameraSerializer

class DestroyCamera(DestroyAPIView):
    queryset = models.Camera.objects.all()
    serializer_class = serializers.CameraSerializer

class ListCreateFilters(ListCreateAPIView):
    queryset = models.Filter.objects.all()
    serializer_class = serializers.FilterSerializer

class DestroyFilter(DestroyAPIView):
    queryset = models.Filter.objects.all()
    serializer_class = serializers.FilterSerializer

class ListCreateAngles(ListCreateAPIView):
    queryset = models.Angle.objects.all()
    serializer_class = serializers.AngleSerializer

class DestroyAngle(DestroyAPIView):
    queryset = models.Angle.objects.all()
    serializer_class = serializers.AngleSerializer