import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Utils } from '../utils/utils';

import {
  Table,
} from 'reactstrap';

const propTypesOJTopics = {
  category: PropTypes.string,
  onTopicItemClick: PropTypes.func.isRequired,
};

class OJTopics extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }





  render () {
    let { topicsGeneral } = this.props;
    return (
      <Fragment>
        <Table striped hover size='sm'>
          <thead>
            <tr>
              <th width="4%">{/*space*/}</th>
              <th width="40%">{'title'}</th>
              <th width="28%">{'category'}</th>
              <th width="28%">{'last modified time'}</th>
            </tr>
          </thead>
          <tbody>
            {topicsGeneral.map((topic) => {
              return (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  onTopicItemClick={this.props.onTopicItemClick}
                />
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

OJTopics.propTypes = propTypesOJTopics;

// const propTypesTopicItem = {
//   onTopicItemClick: PropTypes.func.isRequired,
// };

class TopicItem extends Component {
  render () {
    const { topic } = this.props
    let modified_time = new Date(topic.modified_time);
    let timeStr = Utils.djangoDateTimeStrToShowingStr(modified_time);
    return (
    <tr>
      <td></td>
      <td><Link style={{ textDecoration: 'none' }} to={`/oj-collections/detail/${topic.id}`}>{topic.title}</Link></td>
      <td><Link style={{ textDecoration: 'none' }} to={`/oj-collections/detail/${topic.id}`}>{topic.category}</Link></td>
      <td>{timeStr}</td>
    </tr>
    )
  }
}

//TopicItem.propTypes = propTypesTopicItem;


export default OJTopics;