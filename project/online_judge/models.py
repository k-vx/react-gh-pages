from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class OJTopic(models.Model):
    title = models.CharField(max_length=200)
    desc_general = models.TextField(null=True, blank=True)
    desc_input = models.TextField(null=True, blank=True)
    desc_output = models.TextField(null=True, blank=True)
    exam_input = models.TextField(null=True, blank=True)
    exam_output = models.TextField(null=True, blank=True)
    code = models.TextField()

    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    created_time = models.DateTimeField(editable=False, auto_now_add=True)
    modified_time = models.DateTimeField(auto_now=True)

    source = models.CharField(max_length=200, default='') # the source of this topic

    # use markdown to render this field
    solution = models.TextField()

    def __str__(self):
        if self.title:
            return self.title
        return ''
