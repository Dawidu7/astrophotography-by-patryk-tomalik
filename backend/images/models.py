from django.db import models

# Create your models here.
class Image(models.Model):
    image_url = models.CharField(max_length=255)
    name = models.CharField(max_length=64, unique=True, blank=True, null=True)
    optic = models.CharField(max_length=64, blank=True, null=True)
    camera = models.CharField(max_length=64, blank=True, null=True)
    mount = models.CharField(max_length=64, blank=True, null=True)
    filters = models.CharField(max_length=64, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    sqml = models.CharField(max_length=64, blank=True, null=True)
    exposure_details = models.CharField(max_length=64, blank=True, null=True)
    acquisition = models.CharField(max_length=64, blank=True, null=True)
    processing = models.CharField(max_length=64, blank=True, null=True)
    info = models.CharField(max_length=2000, blank=True, null=True)
    annotation_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class Option(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name


class Optic(Option):
    pass

class Camera(Option):
    pass

class Mount(Option):
    pass

class Filter(Option):
    pass

class ExposureDetail(Option):
    pass

class Acquisition(Option):
    pass

class Processing(Option):
    pass