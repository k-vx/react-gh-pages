from django.urls import path

from blog.views import PostsView, PostView, CategoriesView

urlpatterns = [
    path('api/blog/<category>/', PostsView.as_view(), name='blogs' ),
    path('api/blog-category-names/', CategoriesView.as_view(), name='blog-categories'),
    path('api/blog-detail/<int:post_id>/', PostView.as_view(), name='blog-detail'),
]