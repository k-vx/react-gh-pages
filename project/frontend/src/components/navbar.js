import React, { Component, Fragment } from 'react';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import '../css/fix.css';

class NavBarWrapper extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    return(
      <Fragment>
        <Navbar className='nav-bottom' color="light" light expand="md">
          <div className='container'>
            <NavbarBrand href="/">Leo Sirius</NavbarBrand>
            <Nav className="mr-auto" navbar>
            <NavItem>
                <NavLink href="/">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/oj-collections/all">OJ Collections</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/LeoSirius">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/time-line">TimeLine</NavLink>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBarWrapper;