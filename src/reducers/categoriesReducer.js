import _ from 'lodash'
import {FETCH_CATEGORIES} from "../actions/categoryActions";

export default function categories(state = {}, action){
    switch (action.type){
        case FETCH_CATEGORIES:{

            // console.log("!!!!!!!!",action)
            // const categories = _.mapKeys(action.payload.data.categories,'title')
            const categories = _.mapKeys(action.payload,'title')

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
