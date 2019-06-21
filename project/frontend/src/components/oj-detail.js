import React, { Component, Fragment } from "react";

import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Utils } from '../utils/utils';

import leoAPI from '../api';

class OJDetail extends Component {

  APIGetOJTopicDetail = () => {
    leoAPI.getTopicDetail(this.props.match.params.topic_id)
    .then(data => {
      this.setState({
        topicDetail: data,
      });
    });
  }

  constructor (props) {
    super(props);
    this.state = {
      topicDetail: null,
    }
  }

  componentDidMount() {
    this.APIGetOJTopicDetail();
  }

  render () {
    let { topicDetail } = this.state;

    if(topicDetail){
      let modified_time = new Date(topicDetail.modified_time);
      let created_time = new Date(topicDetail.created_time);
      let modifiedTimeStr = Utils.djangoDateTimeStrToShowingStr(modified_time);
      let createdTimeStr = Utils.djangoDateTimeStrToShowingStr(created_time);
    return (
      <Fragment>
        <h2>{topicDetail.title}</h2>
        <small>
          {'category: ' + topicDetail.category}<br/>
          {'created time: ' + createdTimeStr}<br/>
          {'last modified time: ' + modifiedTimeStr}
        </small>
        <hr/>
        {topicDetail.desc_general &&
        <div>
          <h4>{'General Description:'}</h4>
          <div>
            <ReactMarkdown source={topicDetail.desc_general} />
          </div>
        </div>
        }
        {topicDetail.desc_input &&
          <div>
            <h4>{'Input Description:'}</h4>
            <p>{topicDetail.desc_input}</p>
          </div>
        }
        {topicDetail.desc_output &&
          <div>
            <h4>{'Output Description:'}</h4>
            <p>{topicDetail.desc_output}</p>
          </div>
        }
        {topicDetail.exam_input &&
        <div>
          <h4>{'Sample Input:'}</h4>
          <SyntaxHighlighter
            language='bash'
            style={docco}
            children={topicDetail.exam_input}
          />
        </div>
        }
        {topicDetail.exam_output &&
        <div>
          <h4>{'Sample Output:'}</h4>
          <SyntaxHighlighter
            language='bash'
            style={docco}
            children={topicDetail.exam_output}
          />
        </div>
        }
        {topicDetail.solution &&
        <div>
          <hr/>
          <h4>{'Solution:'}</h4>
          <ReactMarkdown source={topicDetail.solution} />
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



export default OJDetail;