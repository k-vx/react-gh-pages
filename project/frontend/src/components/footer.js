import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return(
      <footer id="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="copyright">2019 LeoSirius' blog <br/>
              powered by react & django
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;