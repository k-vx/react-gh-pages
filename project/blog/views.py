import copy

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from blog.models import Post, Category

def get_post_general_list(posts):
    res = []
    for post in posts:
        dic = {}
        dic['id'] = post.id
        dic['title'] = post.title
        dic['author'] = post.author.username
        dic['category'] = post.category.name
        dic['created_time'] = post.created_time
        dic['modified_time'] = post.modified_time  # convert in local time str in front end
        res.append(copy.copy(dic))
    return res

def get_post_detail(post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist as e:
        pass

    dic = {}
    dic['id'] = post.id
    dic['title'] = post.title
    dic['author'] = post.author.username
    dic['category'] = post.category.name
    dic['created_time'] = post.created_time
    dic['modified_time'] = post.modified_time  # convert in local time str in front end
    dic['content'] = post.content

    return dic

class PostsView(APIView):

    def get(self, request, category, format=None):
        """
        list all posts or posts according to category, in general info
        """

        posts = []
        # return topic list according to category
        if category and category != 'all':
            # given a specified category(except 'all')
            try:
                posts = Post.objects.filter(category__name__contains=category)
            except Post.DoesNotExist as e:
                pass
        else:
            # no category or category==all, return all topics
            try:
                posts = Post.objects.all()
            except Post.DoesNotExist as e:
                pass

        res = get_post_general_list(posts)
        return Response(res)

class PostView(APIView):
    
    def get(self, request, post_id, format=None):
        """
        return a post's detail info
        """

        # return a post detail by id
        if post_id:
            return Response(get_post_detail(post_id))

class CategoriesView(APIView):

    def get(self, request):
        """
        return a list of categories' name, exclude 'all'
        bacause category to topic is one to many, so add 'all' by hand
        """
        categories = Category.objects.all()
        res = ['all']
        for cat in categories:
            res.append(cat.name)

        return Response(res)