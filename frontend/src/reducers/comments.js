import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/comments'

export function comments (state = [], action) {
    switch (action.type) {
        case RECEIVE_COMMENTS :
            return action.comments
        case ADD_COMMENT :
            return state.concat(action.comment)
        case EDIT_COMMENT :
            return state.filter((comment) => comment.id === action.id)
        case DELETE_COMMENT :
            return state.filter((comment) => comment.id === action.id)
        default :
            return state
    }
}