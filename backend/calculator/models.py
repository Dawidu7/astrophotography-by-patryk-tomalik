from django.db import models

# Create your models here.
class Option(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

class Camera(Option):
    resolution_x = models.IntegerField()
    resolution_y = models.IntegerField()
    matrix_x = models.DecimalField(max_digits=3, decimal_places=1)
    matrix_y = models.DecimalField(max_digits=3, decimal_places=1)
    pixel_size = models.DecimalField(max_digits=4, decimal_places=2)

    @property
    def resolution(self):
        return f'{self.resolution_x}x{self.resolution_y}'
    
    @property
    def matrix_size(self):
        return f'{self.matrix_x}x{self.matrix_y}'

class Telescope(Option):
    focal_length = models.IntegerField()
    diameter = models.IntegerField()
    focal_ratio = models.DecimalField(max_digits=3, decimal_places=2)

class FlattReduc(Option):
    times = models.DecimalField(max_digits=3, decimal_places=2)