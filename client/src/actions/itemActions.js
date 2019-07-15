import {FETCH_ITEMS,NEW_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import { doConfig } from './authActions'

var axios = require('axios')

export function fetchItems(){
    return function(dispatch){
        dispatch(setItemsLoading())
        axios
          .get('/api/items')
          .then(res =>
            dispatch({
                type: FETCH_ITEMS,
                payload: res.data
            }))

    }
}

export function deleteItem(_id){
    return function(dispatch,getState){
        axios
          .delete(`/api/items/${_id}`,doConfig(getState))
          .then(res => dispatch({
              type: DELETE_ITEM,
              payload: _id
          }))
    }
}

export function newItem(item){
    return function(dispatch,getState){
        axios
          .post('/api/items',item,doConfig(getState))
          .then(res => dispatch({
              type: NEW_ITEM,
              payload: res.data
          }))

    }
}
export function setItemsLoading(){
    return {
        type: ITEMS_LOADING
    }
}