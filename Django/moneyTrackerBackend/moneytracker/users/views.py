import email
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from  .models  import Transaction,Pending
# from rest_framework.response import Response
import json
# Create your views here.
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        res = json.loads(request.body.decode('UTF-8'))
        print(res)
        username = res['email']
        password = res['password']
        # print(username,password)
        user = authenticate(request,username=username,password=password)
        if user is not None:
            print('user ===>',user.email)
            login(request,user)
            return JsonResponse({"resp":"success","user":user.id},status=200)
        else:
            print("Not Found")
            messages.success(request,"There was error while logging in...")
            return JsonResponse({"resp":"failure"},status=200)
    return HttpResponse(f"Hello {messages}")

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        res = json.loads(request.body.decode('UTF-8'))
        username = res['username']
        email = res['email']
        password = res['password']
        user = authenticate(request,username=email,password=password)
        if user is None:
            newuser = User.objects.create_user(email,email,password)
            newuser.first_name = username
            newuser.save()
            return JsonResponse({"resp":"success"},status=200)
        else:
            print("failure")
            return JsonResponse({"resp":"failure"},status=200)
    return render(request,'user/register.html')
# @csrf_exempt
def show_transact(request):
    all_transactions = []
    temp = Transaction.objects.all()
    for i in temp:
        all_transactions.append({"id":i.id,"name":i.name,"amount":i.amount,"date":i.date,"category":i.category,"type":i.type})
    return JsonResponse({"resp":all_transactions},status=200)
@csrf_exempt
def delete_transact(request,user_id):
    if len(Transaction.objects.filter(id = user_id)) == 0:
        return "Empty Dataset"
    else:
        t = Transaction.objects.filter(id = user_id)
        t.delete()
        return HttpResponse("Deleted")

@csrf_exempt
def add_transact(request):
    if request.method == "POST":
        res = json.loads(request.body.decode('UTF-8'))
        name = res['name']
        amount = res['amount']
        date = res['date']
        category = res['category']
        type = res['type']
        print(name,amount,date,category,type)
        t = Transaction(name=name,amount=amount,date=date,category=category,type=type)
        t.save()
    return HttpResponse("hmmm")
@csrf_exempt
def show_pending(request):
    all_pending = []
    for i in Pending.objects.all():
        all_pending.append({"id":i.id,"name":i.name,"amount":i.amount,"date":i.date,"type":i.type})
    return JsonResponse({"resp":all_pending},status=200)
@csrf_exempt
def test(request):
    print(request.user)
    return JsonResponse({"resp":request.user.id},status=200)
