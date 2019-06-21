from django.shortcuts import render

def react_fake_view(request, *args, **kwargs):
    return render(request, 'frontend/index.html')