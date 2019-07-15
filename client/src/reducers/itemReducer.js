import {FETCH_ITEMS,NEW_ITEM,DELETE_ITEM, ITEMS_LOADING} from '../actions/types'
const initialState = {
    listOfItems : [],
    loading : false
}

export default function(state = initialState,action){
    switch(action.type){
        case FETCH_ITEMS:
            return {
                ...state,
                listOfItems : action.payload,
                loading : false
            };
        case DELETE_ITEM:
            return{
              ...state,
              listOfItems: state.listOfItems.filter(item => item._id!==action.payload)  
            };
        case NEW_ITEM:
            return{
                ...state,
                listOfItems: [...state.listOfItems,action.payload]
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading : true
            }
        default:
            return state
    }
}