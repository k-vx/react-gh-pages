from django.urls import path

from online_judge.views import OJTopicsView, OJDetailView, CategoriesView

urlpatterns = [
    path('api/oj-topics/<category>/', OJTopicsView.as_view(), name='oj-topics' ),
    path('api/oj-topics-detail/<int:topic_id>/', OJDetailView.as_view(), name='oj-detail'),
    path('api/oj-topics-category-names/', CategoriesView.as_view(), name='oj-categories'),
]