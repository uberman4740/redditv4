import {
    CREATE_POST, DELETE_POST, EDIT_POST, GET_ALL_POSTS, GET_CATEGORY_POSTS, GET_POST,
    VOTE_POST
} from "../actions/postActions";
import _ from 'lodash'
import {CREATE_COMMENT, DELETE_COMMENT} from "../actions/commentsActions";

export default function posts(state = {}, action) {


    switch (action.type) {
        case GET_ALL_POSTS: {
            console.log("post reducer state", state)
            const posts = _.mapKeys(action.payload, 'postId')

            return posts
        }
        case GET_CATEGORY_POSTS: {
            return _.mapKeys(action.payload, 'postId')

        }
        case GET_POST: {
            console.log("IN GET POST REDUCER", action)
            const post = action.payload
            return {
                ...state,
                [action.payload.data.id]: action.payload.data


            }
        }

        case VOTE_POST:
            console.log("VOTE COMMENT action", action)
            console.log("STATE", state)
            return {
                ...state,
                [action.payload.postId]: action.payload

            }
        case EDIT_POST:
            return{
                ...state,
                [action.payload.postId]: action.payload

            }
        case CREATE_POST:
            console.log("in create post reducer")
            console.log("STATE:", state)
            console.log("Action", action)

            console.log("in create comment reducer", state)
            return {
                ...state,
                [action.payload.postId]: action.payload

            }
        case DELETE_POST:
            console.log("STATE FOR DELETE POST", state)
            console.log("ACTION FOR DELETE POST", action)
            return _.omit(state,[action.payload.id])

        case CREATE_COMMENT:
            console.log("Reducer COMMENT", action)

            console.log("______________________________", state[action.payload.postId].commentsCount)
            return {
                ...state,
                [action.payload.postId]: {
                    ...state[action.payload.postId],
                    commentsCount: state[action.payload.postId].commentsCount +1
                }
            }
        case DELETE_COMMENT:
            console.log("Reducer COMMENT", action)

            console.log("______________________________", state[action.payload.postId].commentsCount)
            return {
                ...state,
                [action.payload.postId]: {
                    ...state[action.payload.postId],
                    commentsCount: state[action.payload.postId].commentsCount -1
                }
            }


        default:
            return state
    }
}
