import React, { Component } from 'react'
import { Container,ListGroup,ListGroupItem,Button } from 'reactstrap'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import {fetchItems,deleteItem} from '../actions/itemActions'

class ShoppingList extends Component {
    
    componentDidMount(){
        this.props.fetchItems();
    }
    deleting(_id){
        this.props.deleteItem(_id);
    }
//     state = {
//         items : [
//             { id: uuid(), name: 'Eggs'},
//             { id: uuid(), name: 'Milk'},
//             { id: uuid(), name: 'Shit'},
//             { id: uuid(), name: 'Dung'},
//         ]
//    
    render() {
        const { itemss } = this.props;

        return (
            <div>
                <Container>
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {
                                itemss.map(({_id,name}) => (
                                        <CSSTransition key={_id} timeout={500} classNames='fade'>
                                            <ListGroupItem>
                                                {
                                                    (this.props.isauth) ?
                                                    <Button
                                                      className="remove-btn"
                                                      color="danger"
                                                      size="sm"
                                                      onClick={
                                                      this.deleting.bind(this,_id)
                                                      } 
                                                    >&times;</Button> : null
                                                }
                                                {name}
                                            </ListGroupItem>
                                        </CSSTransition>
                                    ))    
                            }
                        </TransitionGroup> 
                    </ListGroup>
                </Container>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    itemss : state.items.listOfItems,
    isauth : state.auth.isAuthenticated
})

export default connect(mapStatetoProps,{fetchItems,deleteItem})(ShoppingList)
