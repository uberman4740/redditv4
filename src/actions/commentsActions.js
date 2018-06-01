import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';
const uuidv4 = require('uuid/v4');

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export const GET_ALL_POST_COMMENTS = 'GET_ALL_POST_COMMENTS'

export const CREATE_COMMENT = "CREATE_COMMENT"

export const DELETE_COMMENT = "DELETE_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"



export function editComment(id,values) {
    const request =  axios.put(`${ROOT_URL}/comments/${id}`,values)
    console.log("################ action edit", request)
    return{
        type:EDIT_COMMENT,
        payload:request
    }


}
export function deleteComment(id){
    const request =  axios.delete(`${ROOT_URL}/comments/${id}`)
    return {
        type: DELETE_COMMENT,
        payload: request
    }

}

export function getAllPostComments(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}/comments`)
    return{
        type: GET_ALL_POST_COMMENTS,
        payload: request

    }
}

export function createComment (values){
    const {body,author,parentId,} = values
    const data = {
        id: uuidv4(),
        timestamp: Date.now(),
        body,
        author,
        parentId

    }
    const request = axios.post(`${ROOT_URL}/comments`,data)


    return{
        type: CREATE_COMMENT,
        payload: request

    }
}

export function voteComment(id, vote){
    const request = axios.post(`${ROOT_URL}/comments/${id}`, {option: vote})

    return{
        type: VOTE_COMMENT,
        payload: request
    }

}


