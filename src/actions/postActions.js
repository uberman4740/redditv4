import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';
import { API } from "aws-amplify";

const uuidv4 = require('uuid/v4');

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

let apiName = 'notes';
let path = '/posts';
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

export function loadAllPosts(data){
    // const req = axios.get(`${ROOT_URL}/categories`)
    // const req = await API.get(apiName,path)
    return{
        type: GET_ALL_POSTS,
        payload: data

    }
}
export function getAllPosts (){

    return async dispatch => {
        const req = await API.get(apiName,path)
        dispatch(
            loadAllPosts(req)
        )

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
export function addPost(data){

    return{
        type: CREATE_POST,
        payload: data
    }
}
export function createPost(values){
    const {title,body,author,category} = values
    const data = {
        title,
        body,
        author,
        category
    }

    return async dispatch => {
        const req = await API.post(apiName,path,{body:data})
        dispatch(
            addPost(req)
        )

    }
}