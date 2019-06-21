import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";

import {
  Nav,
  NavItem,
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap';
import classnames from 'classnames';

import OJTopics from '../components/oj-topics';
import OJDetail from '../components/oj-detail';

import { Utils } from '../utils/utils';

import leoAPI from '../api';

class OJTopicsPage extends Component {

  APIGetOJTopicsByCategory = (category) => {
    leoAPI.getTopicsByCategory(category)
    .then(data => {
      this.setState({
        topicsGeneral: data,
      });
    });
  }

  APIGetOJTopicCategories = () => {
    leoAPI.getTopicCategories()
    .then(data => {
      this.setState({
        categoryNames: data,
      })
    });
  }

  constructor (props) {
    super(props);
    this.state = {
      topicsGeneral: [],
      categoryNames: [],
      activeTab: 'all',    // shows on left, include: 'all', 'leetcode', 'machine_test_guide'
    };
  }

  componentDidMount() {
    this.APIGetOJTopicsByCategory('all');
    this.APIGetOJTopicCategories();
  }

  onTabClick = (e, tabName) => {
    this.setState({
      activeTab: tabName,
    });
    this.APIGetOJTopicsByCategory(tabName);
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
                    to={`/oj-collections/${categoryName}`}
                    onClick={(e) => {this.onTabClick(e, categoryName)}}
                    className={classnames({ active: activeTab === 'categoryName' })}
                  ><span className="capitalized">{Utils.strToSpaceStr(categoryName)}</span></Link>
                </NavItem>
                );
              })
              }
            </Nav>
            <Card className="info-card">
              <CardBody>学习交流QQ群<br/>123456</CardBody>
            </Card>
          </div>
          <div className='col-md-9'>


          <Switch>
            <Route
              path='/oj-collections/detail/:topic_id'
              render={(props) =>
                <OJDetail {...props}
                  topicDetail={this.state.topicDetail}
                />
              }
            />
            <Route
              path='/oj-collections/:category'
              render={(props) =>
                <OJTopics {...props}
                  onTopicItemClick={this.onTopicItemClick}
                  topicsGeneral={this.state.topicsGeneral}
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

export default OJTopicsPage;