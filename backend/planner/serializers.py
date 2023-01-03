from rest_framework.serializers import ModelSerializer
from . import models


class CatalogSerializer(ModelSerializer):
    class Meta:
        model = models.Catalog
        fields = '__all__'

class ConstellationSerializer(ModelSerializer):
    class Meta:
        model = models.Constellation
        fields = '__all__'

class TelescopeSerializer(ModelSerializer):
    class Meta:
        model = models.Telescope
        fields = '__all__'

class CameraSerializer(ModelSerializer):
    class Meta:
        model = models.Camera
        fields = '__all__'

class FilterSerializer(ModelSerializer):
    class Meta:
        model = models.Filter
        fields = '__all__'

class AngleSerializer(ModelSerializer):
    class Meta:
        model = models.Angle
        fields = '__all__'