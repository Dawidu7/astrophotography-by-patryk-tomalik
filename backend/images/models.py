from django.db import models

# Create your models here.
class Image(models.Model):
    image_url = models.CharField(max_length=255)
    name = models.CharField(max_length=64, unique=True)
    optic = models.CharField(max_length=64)
    camera = models.CharField(max_length=64)
    mount = models.CharField(max_length=64)
    filters = models.CharField(max_length=64)
    date = models.DateField()
    sqml = models.CharField(max_length=64)
    exposure_details = models.CharField(max_length=64)
    acquisition = models.CharField(max_length=64)
    processing = models.CharField(max_length=64)
    info = models.CharField(max_length=2000)
    annotation_url = models.CharField(max_length=255)

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