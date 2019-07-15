import React, { Component, Fragment } from 'react'
import { NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Button } from 'reactstrap'
import { TextField } from '@material-ui/core'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { connect } from 'react-redux'

class LoginModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             modal : false,
             email: '',
             password: '',
             mssg : ''
        }
        this.onItemChange = this.onItemChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.props.clearErrors()
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    componentDidUpdate(prevProps){
        const { error , isAuthenticated } = this.props
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL')
            this.setState({ msg : error.msg.msg})
            else
            this.setState({ msg : null })
        }
        if(this.state.modal && isAuthenticated)
        this.toggle()
    }

    onItemChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onLogin(){
        const { email , password } = this.state
        const user = {
            email,
            password
        }
        this.props.login(user)
    }

    render() {
        return (
            <Fragment>
                <NavLink color="dark" href="#" onClick={this.toggle}>Login</NavLink>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader style={{background: 'dark'}} toggle={this.toggle}>Register</ModalHeader>
              <ModalBody style={{postion : 'relative'}}>
                {
                  this.state.msg ? <Alert color='danger'>{ this.state.msg }</Alert> : null
                }
                    <TextField style={{postion:'absolute',top:'5%',margin:'10px'}}
                        id="reg-email"
                        label="Email"
                        name="email"
                        type="email"
                        onChange={this.onItemChange}
                        variant="outlined"
                    />
                    <TextField style={{postion:'absolute',top:'5%',margin:'10px'}}
                        id="reg-pass"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={this.onItemChange}
                        variant="outlined"
                    />
              </ModalBody>
              <ModalFooter>
                <Button color="dark" onClick={this.onLogin}>Login</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    error : state.error
})

export default connect(mapStateToProps,{ login , clearErrors })(LoginModal)