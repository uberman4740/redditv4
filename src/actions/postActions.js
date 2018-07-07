import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';
import {API} from "aws-amplify";

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
export function updatePost(id, values) {
    const request = axios.put(`${ROOT_URL}/posts/${id}`, values)
    return {
        type: EDIT_POST,
        payload: request
    }

}
export function editPost(id, data) {

    return async dispatch => {
        const req = await API.put(apiName, `/posts/${id}`, {body: {option:data.option,userId:data.userId}})
        dispatch(
            updateVotePost(req)
        )

    }

}
export function updateVotePost(data) {


    return {
        type: VOTE_POST,
        payload: data
    }

}
export function votePost(id, data) {

    return async dispatch => {
        const req = await API.put(apiName, `/posts/${id}`, {body: {option:data.option,userId:data.userId}})
        dispatch(
            updateVotePost(req)
        )

    }

}

export function destroyPost(request) {
    return {
        type: DELETE_POST,
        payload: request
    }

}
export function deletePost(id) {
    return async dispatch => {
        const req = await API.del(apiName, `/posts/${id}`)
        req.id=id
        dispatch(destroyPost(req))
    }
}

export function loadAllPosts(data) {
    return {
        type: GET_ALL_POSTS,
        payload: data
    }
}

export function getAllPosts() {
    return async dispatch => {
        const req = await API.get(apiName, path)

        dispatch(loadAllPosts(req))
    }
}

export function loadCategoryPosts(data) {
    return {
        type: GET_CATEGORY_POSTS,
        payload: data

    }
}
export function getCategoryPosts(id) {


    return async dispatch => {
        try {
            dispatch(loadCategoryPosts(await API.get(apiName, `/categories/${id}`)))
        }
        catch (e) {
            console.log(e)
        }


    }
}


export function loadPost(data) {


    return {
        type: GET_POST,
        payload: data

    }
}
export function getPost(postId) {


    return async dispatch => {
        const req = await API.post(apiName, `/posts/${postId}`)
        dispatch(
            loadPost(req)
        )

    }
}

export function addPost(data) {

    return {
        type: CREATE_POST,
        payload: data
    }
}

export function createPost(values) {
    const {title, body, author, category} = values
    const data = {
        title,
        body,
        author,
        category
    }

    return async dispatch => {
        const req = await API.post(apiName, path, {body: data})
        dispatch(
            addPost(req)
        )

    }
}