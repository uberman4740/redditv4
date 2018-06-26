import {combineReducers} from 'redux'
import posts from './postsReducer'
import categories from './categoriesReducer'
import comments from './commentsReducer'
import authUser from './authUserReducer'

// import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    authUser,
    posts,
    categories,
    comments,
    // form: formReducer
})
