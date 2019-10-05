# Create your views here.
from django.http import HttpRequest, HttpResponse, JsonResponse, HttpResponseBadRequest
import simplejson
from .models import User
import jwt
from datetime import datetime
from blog.settings import SECRET_KEY
import bcrypt

AUTHOR_VER = 60 * 60 * 8


def gen_token(user_id):
    ret = jwt.encode(
        {'user_id': user_id,
         'exp': int(datetime.now().timestamp()) + AUTHOR_VER
         }, SECRET_KEY
    )
    return ret.decode()


# 用户验证
def authoration(view):
    def wrapper(req: HttpRequest):
        token = req.META['HTTP_JWT']
        payload = jwt.decode(token, SECRET_KEY)
        timestamp = payload['exp']

        try:
            # 时间验证
            if timestamp:
                user_id = payload['user_id']
                user = User.objects.get(pk=user_id)
                req.user = user  # reqest请求中注入user对象
                return view(req)
        except Exception as e:
            print(e)
            return HttpResponse(status_code=401)

    return wrapper


@authoration  # test = authoration(test)
def test(req: HttpRequest):
    return HttpResponse(b'jwt test')


def login(req: HttpRequest):
    ret = simplejson.loads(req.body)  # {'password': 'abc', 'email': 'wayne@magedu.com'}
    email = ret['email']
    password = ret['password']
    print('~~~~~~~')
    print('!!!!!!!', email, password)
    try:
        user = User.objects.get(email=email)  # 查数据库
        if not user:  # 没有这个账号
            return HttpResponseBadRequest()
        if not bcrypt.checkpw(password.encode(), user.password.encode()):  # 密码验证错误
            return HttpResponseBadRequest()
        return JsonResponse(
            {'user': {'user_id': user.id,
                      'name': user.name,
                      'email': user.name,
                      }, 'token': gen_token(user.id)
             }
        )

    except Exception as e:
        print(e)
        return HttpResponseBadRequest()


def register(reg: HttpRequest):
    # {'name': 'znf', 'password': '1234567@qq.com', 'email': 'abc'}
    playload = simplejson.loads(reg.body)
    print(playload, type(playload))
    try:
        email = playload['email']
        # 对注册的email进行检查
        query = User.objects.filter(email=email)
        print(query, type(query), query.query)
        if query:
            return HttpResponseBadRequest()

        name = playload['name']
        password = playload['password']
        print(email, name, password)

        # ORM操作
        user = User()
        user.email = email
        user.name = name
        user.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        try:
            user.save()
            return JsonResponse({"userid": user.id, 'token': gen_token(user.id)})
        except Exception as e:
            print(e)
            return HttpResponseBadRequest()

    except Exception as e:
        print(e)
        return HttpResponseBadRequest()
