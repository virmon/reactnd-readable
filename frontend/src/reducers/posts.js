import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST, INCREMENT, DECREMENT } from '../actions/posts'

export function posts (state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            return action.posts
        case ADD_POST :
            return state.concat(action.post)
        case EDIT_POST :
            return state.filter((post) => post.id !== action.id).concat(action.post)
        case DELETE_POST :
            return state.filter((post) => post.id !== action.id)
        case INCREMENT :
            return state.map((post) => {
                if (post.id === action.id) {
                    return Object.assign({}, post, {
                        commentCount: post.commentCount + 1
                    })
                }
                return post
            })
        case DECREMENT :
        return state.map((post) => {
            if (post.id === action.id) {
                return Object.assign({}, post, {
                    commentCount: post.commentCount - 1
                })
            }
            return post
        })
        default :
            return state
    }
}