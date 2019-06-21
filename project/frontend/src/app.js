import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBarWrapper from './components/navbar';
import Footer from './components/footer';

import Blog from './pages/blog';
import OJTopicsPage from './pages/oj-page';
import About from './pages/about';
import TimeLine from './pages/time-line';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return(
      <Fragment>
        <NavBarWrapper />
        <div className='container'>
        <Switch>
          <Redirect exact from='/' to='/post/all' />
          {/* 具体的url必须在抽象的url之前，不然抽象的url会把具体的也匹配了 */}
          <Route path="/oj-collections" component={OJTopicsPage} />
          <Route path="/about" component={About} />
          <Route path="/time-line" component={TimeLine} />
          <Route path="/" component={Blog} />
        </Switch>
        <Footer />
        </div>
      </Fragment>
    );
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, wrapper) : null;