from django.db import models

class User(models.Model):
    nickname = models.CharField(max_length=50, default='', blank=False)
    email = models.EmailField(max_length=254, default='', unique=True, blank=False)
    password = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return self.nickname