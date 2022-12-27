from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from .models import Catalog
from .serializers import CatalogSerializer

# Create your views here.
class ListCreateCatalog(ListCreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

class DestroyCatalog(DestroyAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer