from django.db import models

# Create your models here.
class Option(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

class Catalog(Option):
    pass

class Constellation(Option):
    pass

class Telescope(Option):
    pass

class Camera(Option):
    pass

class Filter(Option):
    pass

class Angle(Option):
    pass