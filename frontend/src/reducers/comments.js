import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/comments'

export function comments (state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS :
            return {
                ...state,
                ...action.comments
            }
        case ADD_COMMENT :
            return {
                ...state,
                ...action.comment
            }
        case EDIT_COMMENT :
            return {
                ...state,
                [state.action.id]: {
                    ...action.comment
                }
            }
        case DELETE_COMMENT :
            return {
                ...state,
                ...action.id
            }
        default :
            return state
    }
}