from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('',views.getProducts,name="products"),

    path('create/',views.createProduct,name="create_product"),
    path('upload/',views.uploadImage,name="upload_image"),

    path('<str:pk>/reviews/',views.createProductReview,name="create-review"),
    path('top/',views.getTopProducts,name="top-products"),
    path('<str:pk>/',views.getProduct,name="product"),

    path('update/<str:pk>/',views.updateProduct,name="update_product"),
    path('delete/<str:pk>/',views.deleteProduct,name="delete_product"),
]
