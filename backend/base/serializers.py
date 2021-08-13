from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product 
        fields = '__all__'