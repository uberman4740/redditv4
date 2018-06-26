export const ADD_AUTH_USER = "ADD_AUTH_USER"
// export const SORT_POSTS = "SORT_POSTS"
//
//
// export function sortPosts{
//
// }
export function loadAuthUser(username) {
    return{
        type:ADD_AUTH_USER,
        payload:username
    }
}
export function addAuthUser(username) {
   return dispatch =>{dispatch(loadAuthUser(username))}

}