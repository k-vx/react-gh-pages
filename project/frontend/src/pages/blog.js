import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";

import {
  Nav,
  NavItem,
} from 'reactstrap';
import classnames from 'classnames';

import Posts from '../components/posts';
import PostDetail from '../components/post-detail';

import { Utils } from '../utils/utils';

import leoAPI from '../api';

class Blog extends Component {

  APIGetPostsByCategory = (category) => {
    leoAPI.getPostsByCategory(category)
    .then(data => {
      this.setState({
        postsGeneral: data,
      });
    });
  }

  APIGetPostCategories = () => {
    leoAPI.getPostCategories()
    .then(data => {
      this.setState({
        categoryNames: data,
      })
    });
  }

  constructor (props) {
    super(props);
    this.state = {
      postsGeneral: [],
      categoryNames: [],
      activeTab: 'all',    // shows on left, include: 'all', 'leetcode', 'machine_test_guide'
    };
  }

  componentDidMount() {
    this.APIGetPostsByCategory('all');
    this.APIGetPostCategories();
  }

  onTabClick = (e, tabName) => {
    this.setState({
      activeTab: tabName,
    });
    this.APIGetPostsByCategory(tabName);
  }

  onTopicItemClick = () => {
    this.setState({
      activeTab: '',
    })
  }

  render () {
    let { activeTab, categoryNames } = this.state;
    return (
      <Fragment>
        <div className='row'>
          <div className='col-md-3'>
            <Nav vertical pills>
              {categoryNames.map((categoryName, i) => {
                return (
                <NavItem key={i}>
                  <Link
                    to={`/post/${categoryName}`}
                    onClick={(e) => {this.onTabClick(e, categoryName)}}
                    className={classnames({ active: activeTab === 'categoryName' })}
                  ><span className="capitalized">{Utils.strToSpaceStr(categoryName)}</span></Link>
                </NavItem>
                );
              })
              }
            </Nav>
          </div>
          <div className='col-md-9'>
          <Switch>
            <Route
              path='/post/detail/:post_id'
              render={(props) =>
                <PostDetail {...props}
                  postDetail={this.state.postDetail}
                />
              }
            />
            <Route
              path='/post/:category'
              render={(props) =>
                <Posts {...props}
                  onPostItemClick={this.onPostItemClick}
                  postsGeneral={this.state.postsGeneral}
                />
              }
            />
          </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Blog;