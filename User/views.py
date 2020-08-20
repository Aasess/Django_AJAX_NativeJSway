from django.shortcuts import render,redirect,HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
from .models import CRUDUser
from .forms import UserForm
import json

# Create your views here.
def UserDetails(request):
    users = CRUDUser.objects.all()
    return render(request,'User/CRUD.html',{'users':users})


def UserCreate(request):
    if request.method =="POST" and request.is_ajax():
        #for a post request we will create instance 
        Userdetail = request.body;
        Userdetail = Userdetail.decode("utf-8");
        Userdetail = json.loads(Userdetail)
        CRUDUser.objects.create(
            name=Userdetail['name'],
            email=Userdetail['email'],
            age=Userdetail['age'],
            gender=Userdetail['gender']
            )
        users = CRUDUser.objects.all()
        data = render_to_string('User/includes/partial_user_list.html',{
            'users':users
        })
        #return jsonresponse now
        return JsonResponse({'data':data}); 

    #for a get request we will create a blank form
    else:
        form =  UserForm()
        context = {'form':form}
        html_form = render_to_string('User/includes/partial_user_create.html',context,request=request)    
        return JsonResponse({'html_form':html_form})



def UserUpdate(request,id):
    user = CRUDUser.objects.get(pk = id)
    if request.method =="POST" and request.is_ajax():
        #for a post request we will create instance 
        Userdetail = request.body;
        Userdetail = Userdetail.decode("utf-8");
        Userdetail = json.loads(Userdetail)
        #update user
        user.name = Userdetail['name']
        user.email = Userdetail['email']
        user.age = Userdetail['age']
        user.gender = Userdetail['gender']
        user.save()
        #display the user now 
        users = CRUDUser.objects.all()
        data = render_to_string('User/includes/partial_user_list.html',{
            'users':users
        })
        #return jsonresponse now
        return JsonResponse({'data':data}); 
    else:
        #for a get request we will create a form with current record by passing instance as user
        form = UserForm(instance=user)
        context = {'form':form}
        html_form = render_to_string('User/includes/partial_user_update.html',context,request=request)    
        return JsonResponse({'html_form':html_form})

def UserDelete(request,id):
    user = CRUDUser.objects.get(pk = id)
    if(request.method == 'POST') and request.is_ajax():
        user.delete()
        #display the user now 
        users = CRUDUser.objects.all()
        data = render_to_string('User/includes/partial_user_list.html',{
            'users':users
        })
        #return jsonresponse now
        return JsonResponse({'data':data}); 
    else:
        context = {
            'user':user
        }
        html_form = render_to_string('User/includes/partial_user_delete.html',context,request=request)
        return JsonResponse({'html_form':html_form})