from django.urls import path
from . import views

urlpatterns = [
    path('', views.react_fake_view, name='home-page' ),

    # oj collections
    path('oj-collections/<slug>', views.react_fake_view, name='oj-collections-topics'),
    path('oj-collections/detail/<slug>', views.react_fake_view, name='oj-collections-detail'),

    # blog
    path('post/<slug>', views.react_fake_view),
    path('post/detail/<slug>', views.react_fake_view),

    # others
    path('about', views.react_fake_view),
    path('time-line', views.react_fake_view),
]