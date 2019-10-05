from django.conf.urls import url
from django.contrib import admin
from django.http import HttpResponse, HttpRequest,JsonResponse
from . import views

urlpatterns = [
    url(r'reg', views.register),
    url(r'login', views.login),
    url(r'test', views.test)
]