import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
class Logout extends Component {
    render() {
        return (
            <NavLink color="dark" href="#" onClick={this.props.logout}>Logout</NavLink>
        )
    }
}

export default connect(null,{ logout })(Logout)