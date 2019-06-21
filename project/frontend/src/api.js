import { serviceURL } from './utils/constants';

class LeoAPI{

  // after this encapsulate, in other files, the first then is resolved data

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  // post方式
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }

  //put 修改
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }

  //delete
  delete(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve('数据删除成功!'))
        .catch(err => reject(err))
    })
  }

//------------- up there is 4 encapsulated http method
//------------- below is encapsulated api with detailed url

//------------- oj
  getTopicsByCategory(category){
    let url = serviceURL + 'api/oj-topics/' + category + '/';
    return this.get(url);
  }

  getTopicDetail(topic_id){
    let url = serviceURL + 'api/oj-topics-detail/' + topic_id + '/';
    return this.get(url);
  }

  getTopicCategories(){
    let url = serviceURL + 'api/oj-topics-category-names/';
    return this.get(url);
  }

//------------- blog
  getPostsByCategory(category){
    let url = serviceURL + 'api/blog/' + category + '/';
    return this.get(url);
  }

  getPostDetail(post_id){
    let url = serviceURL + 'api/blog-detail/' + post_id + '/';
    return this.get(url);
  }

  getPostCategories(){
    let url = serviceURL + 'api/blog-category-names/';
    return this.get(url);
  }
}

let leoAPI = new LeoAPI();
export default leoAPI;