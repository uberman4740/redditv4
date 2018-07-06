import {CREATE_POST, EDIT_POST, GET_ALL_POSTS, GET_CATEGORY_POSTS, GET_POST, VOTE_POST} from "../actions/postActions";
import _ from 'lodash'
export default function posts(state = {}, action){


    switch (action.type){
        case GET_ALL_POSTS: {
            console.log("post reducer state",state)
            const posts = _.mapKeys(action.payload, 'postId')

            return posts
        }
        case GET_CATEGORY_POSTS:{
            return _.mapKeys(action.payload, 'postId')

        }
        case GET_POST:{
            console.log("IN GET POST REDUCER", action)
            const post = action.payload
            return{
                ...state,
                [action.payload.data.id]:action.payload.data


            }
        }
        case VOTE_POST:
            console.log("VOTE COMMENT action", action)
            console.log("STATE",state)
            return{
                ...state,
                [action.payload.postId]: action.payload

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
            return {
                ...state,
                [action.payload.postId]:action.payload

    }


        default:
            return state
    }
}
