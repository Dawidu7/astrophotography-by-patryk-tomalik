from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Camera, Telescope, FlattReduc


class CameraSerializer(ModelSerializer):
    resolution = ReadOnlyField()
    matrix_size = ReadOnlyField()
    
    class Meta:
        model = Camera
        fields = '__all__'

class TelescopeSerializer(ModelSerializer):
    class Meta:
        model = Telescope
        fields = '__all__'

class FlattReducSerializer(ModelSerializer):
    class Meta:
        model = FlattReduc
        fields = '__all__'