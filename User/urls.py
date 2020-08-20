from django.urls import path
from . import views

urlpatterns = [
    path('',views.UserDetails,name="UserDetails"),
    path('create/',views.UserCreate,name="UserCreate"),
    path('update/<str:id>/',views.UserUpdate,name="UserUpdate"),
    path('delete/<str:id>/',views.UserDelete,name="UserDelete")
]
