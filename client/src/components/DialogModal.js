
import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import TextField from '@material-ui/core/TextField'
import { newItem } from '../actions/itemActions'
import { connect } from 'react-redux'
import uuid from 'uuid'

class DialogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      itemName: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onItemAdded = this.onItemAdded.bind(this);
    this.onItemChange = this.onItemChange.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onItemChange(event){
      this.setState({
          itemName: event.target.value
      })
  }
  onItemAdded() {
    this.props.newItem({id: uuid(),name: this.state.itemName});
    this.toggle();
  }
  render() {
    return (
      <div style={{margin: '14px'}} >
        {
          (this.props.isAuth) ?
          <Fragment>
          <Button color="dark" onClick={this.toggle}>ADD ITEM</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader style={{background: 'dark'}} toggle={this.toggle}>Add Item</ModalHeader>
            <ModalBody>
              <TextField
                      id="outlined-search"
                      label="Item Name"
                      type="search"
                      margin="normal"
                      onChange={this.onItemChange}
                      variant="outlined"
                  />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onItemAdded}>Add It</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          </Fragment> : <Alert color="primary">Please login to add items</Alert>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{newItem})(DialogModal);