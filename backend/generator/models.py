from django.db import models

# Create your models here.
class Catalog(models.Model):
    name = models.CharField(max_length=24)
    value = models.CharField(max_length=24)

    def __str__(self):
        return f'{self.name} - {self.value}'