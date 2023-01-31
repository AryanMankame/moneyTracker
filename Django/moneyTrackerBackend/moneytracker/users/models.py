from django.db import models

# Create your models here.
class Transaction(models.Model):
    name = models.CharField(max_length=32)
    amount = models.IntegerField()
    date = models.DateField()
    category = models.CharField(max_length=32)
    type = models.CharField(max_length=16)
    def __str__(self):
        return f"{self.id} {self.name}"

class Pending(models.Model):
    name = models.CharField(max_length=32)
    amount = models.IntegerField()
    date = models.DateField()
    type = models.CharField(max_length=16)
    def __str__(self):
        return f"{self.id} {self.name}"