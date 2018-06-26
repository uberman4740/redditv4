import {ADD_AUTH_USER} from "../actions/authAction";

export default function authUser(state = {}, action) {



    switch (action.type) {

        case ADD_AUTH_USER: {
            console.log("authUser State", state)
            console.log("authUser action", action)
            return action.payload
        }
        default:
            return state
    }

}