from django.contrib import admin
from .models import Camera, Telescope, FlattReduc

# Register your models here.
admin.site.register(Camera)
admin.site.register(Telescope)
admin.site.register(FlattReduc)