# from django.db import models

# # Create your model

# class login (models.Model):
#     email=models.EmailField()
#     password=models.CharField(max_length=100)


# class user(models.Model):
#     name=models.CharField(max_length=100)
#     contact=models.CharField(max_length=100)
#     loginid=models.CharField(max_length=100)


# from django.db import models

# class NetworkTraffic(models.Model):
#     source_ip = models.CharField(max_length=45)
#     destination_ip = models.CharField(max_length=45)
#     protocol = models.CharField(max_length=50)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     raw_data = models.TextField()

# class SystemLog(models.Model):
#     message = models.TextField()
#     level = models.CharField(max_length=50)
#     timestamp = models.DateTimeField(auto_now_add=True)