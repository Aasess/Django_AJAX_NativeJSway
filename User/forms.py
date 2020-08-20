from django import forms
from .models import CRUDUser


class UserForm(forms.ModelForm):
    GENDER_CHOICES = [
        ('M','Male'),
        ('F','Female'),
    ]
    name = forms.CharField(max_length=30)
    email = forms.EmailField(max_length=30)
    age = forms.IntegerField()
    gender = forms.ChoiceField(widget=forms.RadioSelect,choices=GENDER_CHOICES)
    
    #add bootstrap class to each form
    name.widget.attrs.update({
        'class':'form-control'
    })

    email.widget.attrs.update({
        'class':'form-control'
    })

    age.widget.attrs.update({
        'class':'form-control'
    })
    
    gender.widget.attrs.update({
        'class':'form-check-input'
    })
    
    class Meta:
        model= CRUDUser
        fields = ['name','email','age','gender']


