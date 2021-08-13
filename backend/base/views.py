# Django Import 
from django.shortcuts import render
from django.http import JsonResponse

# Rest Framework Import
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Local Import 
from .products import products
from .models import *
from .serializers import ProductSerializer

# views Starts from here.

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

