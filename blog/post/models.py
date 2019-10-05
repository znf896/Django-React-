from django.db import models
from user.models import User


# Create your models here.

class Post(models.Model):
    class Meta:
        db_table = 'post'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=False)
    pubdate = models.DateField(null=False)
    author = models.ForeignKey(User)

    def __repr__(self):
        return "<Post {} {} {} {}>".format(self.id, self.title, self.pubdate, self.author)

    __str__ = __repr__


class Content(models.Model):
    class Meta:
        db_table = 'content'

    id = models.AutoField(primary_key=True)
    content = models.TextField(null=False)
    cont_post = models.OneToOneField(Post, to_field='id')

    def __repr__(self):
        return "<Content {} {} {} >".format(self.id, self.content, self.cont_post)

    __str__ = __repr__