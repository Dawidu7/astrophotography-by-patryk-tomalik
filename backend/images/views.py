from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, DestroyAPIView
from . import models, serializers

# Create your views here.
class ListCreateImages(ListCreateAPIView):
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer

class RetrieveUpdateDestroyImage(RetrieveUpdateDestroyAPIView):
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer
    
    
class ListCreateOptics(ListCreateAPIView):
    queryset = models.Optic.objects.all()
    serializer_class = serializers.OpticSerializer
    
class DestroyOptic(DestroyAPIView):
    queryset = models.Optic.objects.all()
    serializer_class = serializers.OpticSerializer


class ListCreateCameras(ListCreateAPIView):
    queryset = models.Camera.objects.all()
    serializer_class = serializers.CameraSerializer
    
class DestroyCamera(DestroyAPIView):
    queryset = models.Camera.objects.all()
    serializer_class = serializers.CameraSerializer


class ListCreateMounts(ListCreateAPIView):
    queryset = models.Mount.objects.all()
    serializer_class = serializers.MountSerializer
    
class DestroyMount(DestroyAPIView):
    queryset = models.Mount.objects.all()
    serializer_class = serializers.MountSerializer


class ListCreateFilters(ListCreateAPIView):
    queryset = models.Filter.objects.all()
    serializer_class = serializers.FilterSerializer
    
class DestroyFilter(DestroyAPIView):
    queryset = models.Filter.objects.all()
    serializer_class = serializers.FilterSerializer


class ListCreateExposureDetails(ListCreateAPIView):
    queryset = models.ExposureDetail.objects.all()
    serializer_class = serializers.ExposureDetailSerializer
    
class DestroyExposureDetail(DestroyAPIView):
    queryset = models.ExposureDetail.objects.all()
    serializer_class = serializers.ExposureDetailSerializer


class ListCreateAcquisitions(ListCreateAPIView):
    queryset = models.Acquisition.objects.all()
    serializer_class = serializers.AcquisitionSerializer
    
class DestroyAcquisition(DestroyAPIView):
    queryset = models.Acquisition.objects.all()
    serializer_class = serializers.AcquisitionSerializer


class ListCreateProcessings(ListCreateAPIView):
    queryset = models.Processing.objects.all()
    serializer_class = serializers.ProcessingSerializer
    
class DestroyProcessing(DestroyAPIView):
    queryset = models.Processing.objects.all()
    serializer_class = serializers.ProcessingSerializer