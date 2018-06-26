import {CREATE_POST, EDIT_POST, GET_ALL_POSTS, GET_CATEGORY_POSTS, GET_POST, VOTE_POST} from "../actions/postActions";
import _ from 'lodash'
export default function posts(state = {}, action){
    switch (action.type){
        case GET_ALL_POSTS: {
            console.log("post reducer state",state)
            const posts = _.mapKeys(action.payload, 'postId')

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
            console.log("in reducer for edit", action)
            return{
                ...state,
                [action.payload.data.id]: action.payload.data

            }
        case CREATE_POST:
            console.log("in create post reducer")
            console.log("STATE:", state)
            console.log("Action",action)

            console.log("in create comment reducer", state)
            return [
                ...state,
                action.payload
            ]


        default:
            return state
    }
}
