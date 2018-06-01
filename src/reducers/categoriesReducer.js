import _ from 'lodash'
import {FETCH_CATEGORIES} from "../actions/categoryActions";

export default function categories(state = {}, action){
    switch (action.type){
        case FETCH_CATEGORIES:{
            const categories = _.mapKeys(action.payload.data.categories,'id')
            // console.log("payload", action.payload.data)
            // console.log(categories)
            return{
                ...state,
                ...categories
            }}
        default:
            return state
    }
}
