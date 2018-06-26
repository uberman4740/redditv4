import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';
import { API } from "aws-amplify";

const URL = 'https://ddk0b6nwxk.execute-api.us-east-1.amazonaws.com/prod'

let apiName = 'notes';
let path = '/categories';
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export const FETCH_CATEGORIES = "fetch_categories"


export function loadAllCategories(data){
    // const req = axios.get(`${ROOT_URL}/categories`)
    // const req = await API.get(apiName,path)
    return{
        type: FETCH_CATEGORIES,
        payload: data

    }
}

export const getAllCategories= ()=>{
    // const req = axios.get(`${ROOT_URL}/categories`)
    return async dispatch => {
        const req = await API.get(apiName,path)
        dispatch(loadAllCategories(req))

    }



}


