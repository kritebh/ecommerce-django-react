# Django Import 
from django.shortcuts import render
from django.http import JsonResponse

# Rest Framework Import
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Local Import 
from .products import products


# views Starts from here.

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getProducts(request):
    return Response(products)


@api_view(['GET'])
def getProduct(request,pk):
    for i in products:
        if i['_id'] == pk:
            product = i
            break

    return Response(product)

