import React ,{Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem } from 'reactstrap';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Logout from './Logout';
import { connect } from 'react-redux'

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.auth = this.auth.bind(this)
    this.notauth = this.notauth.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  auth(){
    return (
      <Fragment>
              <NavItem>   
              <RegisterModal />
              </NavItem>
              <NavItem>   
              <LoginModal/>
              </NavItem>
              </Fragment>
    )
  }
  notauth(){
    const { user } = this.props
    return(
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome Home ${user.name}` : null}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout/>
        </NavItem>
      </Fragment>
    )
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className='mb-5'>
          <NavbarBrand href="/">Shopping_List</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {
                !this.props.isAuthenticated ? this.auth() : this.notauth()    
              }
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
   } 
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    user : state.auth.user
})

export default connect(mapStateToProps,{})(AppNavbar)