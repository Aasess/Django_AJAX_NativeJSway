from django.db import models

# Create your models here.
class CRUDUser(models.Model):
    GENDER_CHOICES = (
        ('M','Male'),
        ('F','Female'),
    )
    name = models.CharField(max_length=30 , blank=True)
    email = models.CharField(max_length=30,blank=True)
    age = models.IntegerField(blank=True,null=True)
    gender = models.CharField(max_length = 1,choices=GENDER_CHOICES ,null=True)