import React, { Component, Fragment } from "react";

import ReactMarkdown from 'react-markdown';

import { Utils } from '../utils/utils';

import leoAPI from '../api';

class PostDetail extends Component {

  APIGetPostDetail = () => {
    leoAPI.getPostDetail(this.props.match.params.post_id)
    .then(data => {
      this.setState({
        postsDetail: data,
      });
    });
  }

  constructor (props) {
    super(props);
    this.state = {
      postsDetail: null,
    }
  }

  componentDidMount() {
    this.APIGetPostDetail();
  }

  render () {
    let { postsDetail } = this.state;
    if(postsDetail){
      let modified_time = new Date(postsDetail.modified_time);
      let created_time = new Date(postsDetail.created_time);
      let modifiedTimeStr = Utils.djangoDateTimeStrToShowingStr(modified_time);
      let createdTimeStr = Utils.djangoDateTimeStrToShowingStr(created_time);
    return (
      <Fragment>
        <h1>{postsDetail.title}</h1>
        <small>
          {'category: ' + postsDetail.category}<br/>
          {'created time: ' + createdTimeStr}<br/>
          {'last modified time: ' + modifiedTimeStr}
        </small>
        <hr/>
        {postsDetail.content &&
        <div>
          <ReactMarkdown source={postsDetail.content} />
        </div>
        }
      </Fragment>
    );
  }else{
    return (
      <p>loading...</p>
    );
  }
  }
}



export default PostDetail;