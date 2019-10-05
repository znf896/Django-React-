"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url
from django.contrib import admin
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.conf.urls import include
from django.shortcuts import render


def index(request: HttpRequest):
    '''视图函数，请求进来响应'''
    d = {}
    d['method'] = request.method
    d['path'] = request.path
    d['path_info'] = request.path_info
    d['GETparams'] = request.GET
    ls = [1, 2, 3, 4, 5]

    # return JsonResponse(d)
    # return HttpResponse('index html')
    return render(request, 'index.html', {"dct": dict(zip('abcde', range(1, 6)))})


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index$', index),
    url(r'^$', index),
    url(r'user/', include('user.urls')),
    url(r'post/', include('post.urls')),

]
