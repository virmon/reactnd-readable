import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/posts'

export function posts (state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            return action.posts
        case ADD_POST :
            return {
                ...state,
                ...action.post
            }
        case EDIT_POST :
            return {
                ...state,
                [state.action.id]: {
                    ...action.post
                }
            }
        case DELETE_POST :
            return {
                ...state,
                ...action.id
            }
        default :
            return state
    }
}