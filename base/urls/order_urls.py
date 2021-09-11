from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('',views.getOrders,name="allorders"),
    path('add/',views.addOrderItems,name="orders-add"),
    path('myorders/',views.getMyOrders,name="myorders"),

    path('<str:pk>/deliver/',views.updateOrderToDelivered,name="delivered"),
    path('<str:pk>/',views.getOrderById,name="user-order"),
    path('<str:pk>/pay/',views.updateOrderToPaid,name="pay"),
]
