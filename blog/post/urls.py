from django.conf.urls import url
from django.contrib import admin
from django.http import HttpResponse, HttpRequest,JsonResponse
from . import views

urlpatterns = [
    url(r'pub', views.pub),
    url(r'(\d+)', views.get),
    url(r'^$', views.getall),
]