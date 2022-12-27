from rest_framework.serializers import ModelSerializer
from . import models


class ImageSerializer(ModelSerializer):
    class Meta:
        model = models.Image
        fields = '__all__'


class OpticSerializer(ModelSerializer):
    class Meta:
        model = models.Optic
        fields = '__all__'

class CameraSerializer(ModelSerializer):
    class Meta:
        model = models.Camera
        fields = '__all__'

class MountSerializer(ModelSerializer):
    class Meta:
        model = models.Mount
        fields = '__all__'

class FilterSerializer(ModelSerializer):
    class Meta:
        model = models.Filter
        fields = '__all__'

class ExposureDetailSerializer(ModelSerializer):
    class Meta:
        model = models.ExposureDetail
        fields = '__all__'

class AcquisitionSerializer(ModelSerializer):
    class Meta:
        model = models.Acquisition
        fields = '__all__'

class ProcessingSerializer(ModelSerializer):
    class Meta:
        model = models.Processing
        fields = '__all__'