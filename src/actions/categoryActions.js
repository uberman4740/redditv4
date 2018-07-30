
import { API } from "aws-amplify";


let apiName = 'notes';
let path = '/categories';

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"


export function loadAllCategories(data){

    return{
        type: FETCH_CATEGORIES,
        payload: data

    }
}

export const getAllCategories= ()=>{
    return async dispatch => {
        const req = await API.get(apiName,path)
        dispatch(loadAllCategories(req))

    }



}


