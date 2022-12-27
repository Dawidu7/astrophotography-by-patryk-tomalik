from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Image)
admin.site.register(models.Optic)
admin.site.register(models.Camera)
admin.site.register(models.Mount)
admin.site.register(models.Filter)
admin.site.register(models.ExposureDetail)
admin.site.register(models.Acquisition)
admin.site.register(models.Processing)