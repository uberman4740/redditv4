import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';
const uuidv4 = require('uuid/v4');

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;


export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS"
export const GET_POST = "GET_POST"
export const CREATE_POST = "CREATE_POST"
export const DELETE_POST = "DELETE_POST"
export const VOTE_POST = "VOTE_POST"
export const EDIT_POST = "EDIT_POST"
// export const SORT_POSTS = "SORT_POSTS"
//
//
// export function sortPosts{
//
// }
export function editPost(id,values) {
    const request =  axios.put(`${ROOT_URL}/posts/${id}`,values)
    return{
        type:EDIT_POST,
        payload:request
    }


}
export function votePost(id, vote){
    const request = axios.post(`${ROOT_URL}/posts/${id}`, {option: vote})

    return{
        type: VOTE_POST,
        payload: request
    }

}

export function deletePost(id){
    const request =  axios.delete(`${ROOT_URL}/posts/${id}`)
    return {
        type: DELETE_POST,
        payload: request
    }

}
export function getAllPosts (){
    const request = axios.get(`${ROOT_URL}/posts`)

    return{
        type: GET_ALL_POSTS,
        payload: request

    }
}

export function getCategoryPosts (category){
    const request = axios.get(`${ROOT_URL}/${category}/posts`)


    return{
        type: GET_CATEGORY_POSTS,
        payload: request

    }
}

export function getPost (postId){
    const request = axios.get(`${ROOT_URL}/posts/${postId}`)


    return{
        type: GET_POST,
        payload: request

    }
}
export function createPost(values){
   const {title,body,author,category} = values
    const data = {
        id: values.id,
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
    const request = axios.post(`${ROOT_URL}/posts`,data)


    return{
        type: CREATE_POST,
        payload: request

    }
}
