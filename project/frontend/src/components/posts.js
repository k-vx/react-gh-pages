import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Utils } from '../utils/utils';

import {
  Table,
} from 'reactstrap';

const propTypesPosts = {
  category: PropTypes.string,
};

class Posts extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }

  render () {
    let { postsGeneral } = this.props;
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
            {postsGeneral.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  post={post}
                />
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

Posts.propTypes = propTypesPosts;

class PostItem extends Component {
  render () {
    const { post } = this.props
    let modified_time = new Date(post.modified_time);
    let timeStr = Utils.djangoDateTimeStrToShowingStr(modified_time);
    return (
    <tr>
      <td></td>
      <td><Link style={{ textDecoration: 'none' }} to={`/post/detail/${post.id}`}>{post.title}</Link></td>
      <td><Link style={{ textDecoration: 'none' }} to={`/post/detail/${post.id}`}>{post.category}</Link></td>
      <td>{timeStr}</td>
    </tr>
    )
  }
}

export default Posts;