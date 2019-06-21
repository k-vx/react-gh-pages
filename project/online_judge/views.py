
import copy

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from online_judge.models import OJTopic, Category

def get_topic_general_list(topics):
    res = []
    for topic in topics:
        dic = {}
        dic['id'] = topic.id
        dic['title'] = topic.title
        dic['author'] = topic.author.username
        dic['category'] = topic.category.name
        dic['modified_time'] = topic.modified_time  # convert in local time str in front end
        res.append(copy.copy(dic))
    return res

def get_topic_detail(topic_id):

    try:
        topic = OJTopic.objects.get(id=topic_id)
    except OJTopic.DoesNotExist as e:
        pass

    dic = {}
    dic['id'] = topic.id
    dic['title'] = topic.title
    dic['author'] = topic.author.username
    dic['created_time'] = topic.created_time
    dic['modified_time'] = topic.modified_time  # convert in local time str in front end
    dic['desc_general'] = topic.desc_general
    dic['desc_input'] = topic.desc_input
    dic['desc_output'] = topic.desc_output
    dic['exam_input'] = topic.exam_input
    dic['exam_output'] = topic.exam_output
    dic['code'] = topic.code

    dic['category'] = topic.category.name
    dic['source'] = topic.source
    dic['solution'] = topic.solution

    return dic

class OJTopicsView(APIView):
    """
    list all topics or some topics according to category
    """

    def get(self, request, category, format=None):
        """
        get all topics or topics according to category, in general info
        """

        topics = []
        # return topic list according to category
        if category and category != 'all':
            # given a specified category(except 'all')
            try:
                topics = OJTopic.objects.filter(category__name__contains=category)
            except OJTopic.DoesNotExist as e:
                pass
        else:
            # no category or category==all, return all topics
            try:
                topics = OJTopic.objects.all()
            except OJTopic.DoesNotExist as e:
                pass

        res = get_topic_general_list(topics)
        return Response(res)

class OJDetailView(APIView):
    
    def get(self, request, topic_id, format=None):
        """
        return a topic's detail info
        """

        # return a topic detail by id
        if topic_id:
            return Response(get_topic_detail(topic_id))

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


