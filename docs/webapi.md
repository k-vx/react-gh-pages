# webapi

## 概述

把api按照app拆分写在每个app中，每个app中的url都是api的url，页面的url统一由frontend中的url处理。不同于seahub，因为seahub有些数据是从底层获取的，没有model，所以把这些从底层获取数据的view单独写在api的app中。这里的数据都从model中获得，所以直接把api的处理放在每个app中，这样结构更清晰。
所有api都假定主机ip为127.0.0.1

前面的描述信息都用-连接单词，最后的参数采用/链接

## Online Judge

### get http://127.0.0.1/api/oj-topics/<category>/

get topics list according to category. if category == 'all' or category is null return all topics.

### get http://127.0.0.1/api/oj-topics-category-names/

return all categories' name, including 'all', in a list.

### get http://127.0.0.1/api/oj-topics-detail/<int:topic_id>/

return detailed info of a topic by topic_id.

## Blog

### get http://127.0.0.1/api/blog/<category>/

get blog general info filt by category

### get http://127.0.0.1/api/blog-category-names/

get blog categories' names

### get http://127.0.0.1/api/blog-detail/<int:post_id>/

get blog detailed info