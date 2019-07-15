import React, { Component, Fragment } from 'react'
import { NavLink,Button, Modal, ModalHeader, ModalBody, ModalFooter , Alert } from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'


class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          name: '',
          email:'',
          password:'',
          msg: null
        };
    
        this.toggle = this.toggle.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onItemChange = this.onItemChange.bind(this)
      }

      componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error){
          if(error.id === 'REGISTER_FAIL')
            this.setState({ msg : error.msg.msg})
          else
            this.setState({msg : null})
        }
        if(this.state.modal && this.props.isAuthenticated)
        this.toggle()
      }
    
      toggle() {
        this.props.clearErrors()
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      onItemChange(event){
          this.setState({
              [event.target.name]: event.target.value
          })
      }
      onRegister() {
        const { name , email , password } = this.state
        const newUser = {
          name,
          email,
          password
        }
        this.props.register(newUser)
      }
      render() {
        return (
          <Fragment>
            <NavLink color="dark" href="#" onClick={this.toggle}>Register</NavLink>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader style={{background: 'dark'}} toggle={this.toggle}>Register</ModalHeader>
              <ModalBody style={{postion : 'relative'}}>
                {
                  this.state.msg ? <Alert color='danger'>{ this.state.msg }</Alert> : null
                }
                <TextField style={{postion:'absolute',top:'5%',margin:'10px'}}
                        id="reg-name"
                        label="Name"
                        type="search"
                        name="name"
                        onChange={this.onItemChange}
                        variant="outlined"
                    />
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
                <Button color="dark" onClick={this.onRegister}>Register</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </Fragment>
        );
      }
}
const mapStatetoProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    error : state.error
})
export default connect(mapStatetoProps,{register,clearErrors})(RegisterModal)