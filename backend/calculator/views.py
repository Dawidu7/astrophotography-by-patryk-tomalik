from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from .models import Camera, Telescope, FlattReduc
from .serializers import CameraSerializer, TelescopeSerializer, FlattReducSerializer


# Create your views here.
class ListCreateCameras(ListCreateAPIView):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer

class DestroyCamera(DestroyAPIView):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer
    
class ListCreateTelescopes(ListCreateAPIView):
    queryset = Telescope.objects.all()
    serializer_class = TelescopeSerializer

class DestroyTelescope(DestroyAPIView):
    queryset = Telescope.objects.all()
    serializer_class = TelescopeSerializer

class ListCreateFlattReducs(ListCreateAPIView):
    queryset = FlattReduc.objects.all()
    serializer_class = FlattReducSerializer

class DestroyFlattReduc(DestroyAPIView):
    queryset = FlattReduc.objects.all()
    serializer_class = FlattReducSerializer