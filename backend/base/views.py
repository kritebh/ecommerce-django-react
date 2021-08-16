# Django Import 
from django.shortcuts import render
from django.http import JsonResponse

# Rest Framework Import
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Rest Framework JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Local Import 
from .products import products
from .models import *
from .serializers import ProductSerializer

# views Starts from here.

# JWT Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Proshop"
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




# Shop API View
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many = True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

