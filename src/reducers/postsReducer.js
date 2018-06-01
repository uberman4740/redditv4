import {EDIT_POST, GET_ALL_POSTS, GET_CATEGORY_POSTS, GET_POST, VOTE_POST} from "../actions/postActions";
import _ from 'lodash'
export default function posts(state = {}, action){
    switch (action.type){
        case GET_ALL_POSTS: {
            const posts = _.mapKeys(action.payload.data, 'id')

            return {
                ...state,
                ...posts
            }
        }
        case GET_CATEGORY_POSTS:{
            const categoryPosts = _.mapKeys(action.payload.data, 'id')
            return _.mapKeys(action.payload.data, 'id')

        }
        case GET_POST:{
            const post = action.payload.data
            return{
                ...state,
                [action.payload.data.id]:action.payload.data


            }
        }
        case VOTE_POST:
            // console.log("VOTE COMMENT action.payload.data", action.payload.data)
            return{
                ...state,
                [action.payload.data.id]: action.payload.data

            }
        case EDIT_POST:
            return{
                ...state,
                [action.payload.data.id]: action.payload.data

            }


        default:
            return state
    }
}
