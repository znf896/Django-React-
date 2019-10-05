from django.test import TestCase
import bcrypt
# Create your tests here.


key = b'abc'
one = bcrypt.hashpw(key, bcrypt.gensalt())
print(type(one))
print(bcrypt.checkpw(key, one))