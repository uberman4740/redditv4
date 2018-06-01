import {
    ROOT_URL,
    AUTH_HEADERS

} from './shared';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export const FETCH_CATEGORIES = "fetch_categories"


export function getAllCategories(){
    const req = axios.get(`${ROOT_URL}/categories`)
    return{
        type: FETCH_CATEGORIES,
        payload: req

    }
}
