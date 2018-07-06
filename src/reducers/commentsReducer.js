import _ from 'lodash'
import {CREATE_COMMENT, EDIT_COMMENT, GET_ALL_POST_COMMENTS, VOTE_COMMENT} from "../actions/commentsActions";
export default function comments(state = {}, action){
    switch (action.type){
        case GET_ALL_POST_COMMENTS:

            console.log("comment reducer state",state)
            const comments = _.mapKeys(action.payload, 'commentId')

            return comments

        case CREATE_COMMENT:
            console.log("Reducer COMMENT", action)

            console.log("in create comment reducer", state)
            return {
                ...state,
                [action.payload.commentId]:action.payload
    };
        case VOTE_COMMENT:
            console.log("VOTE COMMENT action.payload.data", action.payload.data)
            return{
                ...state,
                [action.payload.commentId]: action.payload

            }
        case EDIT_COMMENT:
            console.log("################ reducer action edit", action)

            return{
                ...state,
                [action.payload.commentId]: action.payload

            }





        default:
            return state
    }
}
