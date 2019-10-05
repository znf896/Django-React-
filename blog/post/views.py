from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse, HttpResponseBadRequest
import simplejson
from .models import Post, Content
from datetime import datetime, timedelta, timezone
from user.views import authoration
import math


# Create your views here.
@authoration
def pub(req: HttpRequest):
    try:
        payload = simplejson.loads(req.body)  # {'title': '这是我的文章', 'content': '我的第一篇文章 ZNF'}
        title = payload['title']
        content = payload['content']
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()

    post = Post()
    con = Content()

    try:
        post.title = title
        post.pubdate = datetime.now(timezone(timedelta(hours=8)))
        post.author_id = req.user.id
        post.save()

        con.content = content
        con.cont_post_id = post.id
        con.save()
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()

    return JsonResponse({
        'post_id': post.id
    })


def get(req: HttpRequest, id):
    post = Post.objects.get(pk=id)
    print('!!!!!!!', post.author)
    print(type(post.author))  # <class 'user.models.User'>
    print(post.author.name)  # wayne
    print(post.author.email)  # wayne@magedu.com
    print(post.author.password)  # $2b$12$WRnUui4kOn3kHH2Pcn6FFeDLC5haY3vpYK1W4eZtkeh9DTt22ZsGK
    print(post.content.content)

    return JsonResponse({
        'post_id': post.id,
        'post_name': post.author.name,
        'post_date': post.pubdate,
        'post_title': post.title,
        'post_content':post.content.content,
    })


def val_fun(name: str, d: dict, default, conver_func, judge_func):
    try:
        ret = conver_func(d[name])
        ret = judge_func(ret, default)
        return ret
    except Exception as e:
        print(e)
        ret = default
        return ret


def getall(req: HttpRequest):
    # page和size的判断条件的参数不同，不能把参数提取出来，写死在里面，但是这两个可以用一个lambda来解决
    page = val_fun('page', req.GET, 1, int, lambda x, y: x if x > 0 else y)
    size = val_fun('size', req.GET, 20, int, lambda x, y: x if x > 0 and x < 101 else y)

    print(page, size)

    start = (page - 1) * size
    posts = Post.objects.order_by('-id')[
            start:start + size]  # offset start limit size # <QuerySet [<Post 4 这是我的文章2 2019-09-21 <user 1 wayne>>, <Post 3 这是我的文章 2019-09-21 <user 1 wayne>>]>
    total_size = Post.objects.count()
    return JsonResponse({
        'post_result': [{'post_id': post.id,
                         'title': post.title,
                         'author':post.author.name,}
                        for post in posts],
        'pagnation': {
            'page': page,
            'size': size,
            'total_size': total_size,
            'total_page': math.ceil(total_size / size)}
    })
