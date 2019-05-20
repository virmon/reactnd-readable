import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT } from '../actions/comments'

export function comments (state = [], action) {
    switch (action.type) {
        case RECEIVE_COMMENTS :
            return action.comments
        case ADD_COMMENT :
            return state.concat(action.comment)
        case EDIT_COMMENT :
            return state.filter((comment) => comment.id !== action.comment.id).concat(action.comment)
        case DELETE_COMMENT :
            return state.filter((comment) => comment.id !== action.id)
        case UP_VOTE_COMMENT :
            return state.map((comment) => {
                if (comment.id === action.id) {
                    return Object.assign({}, comment, {
                        voteScore: comment.voteScore + 1
                    })
                }
                return comment
            })
        case DOWN_VOTE_COMMENT :
            return state.map((comment) => {
                if (comment.id === action.id) {
                    return Object.assign({}, comment, {
                        voteScore: comment.voteScore - 1
                    })
                }
                return comment
            })
        default :
            return state
    }
}