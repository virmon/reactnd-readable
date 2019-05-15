import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/posts'

export function posts (state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            return action.posts
        case ADD_POST :
            return state.concat(action.post)
        case EDIT_POST :
            return [
                ...state,
                state.filter((post) => post.id === action.id)
            ]
        case DELETE_POST :
            return state.filter((post) => post.id !== action.id)
        default :
            return state
    }
}