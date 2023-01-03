from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Catalog)
admin.site.register(models.Constellation)
admin.site.register(models.Telescope)
admin.site.register(models.Camera)
admin.site.register(models.Filter)
admin.site.register(models.Angle)