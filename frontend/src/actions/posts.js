export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}
export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost (post, id) {
    return {
        type: EDIT_POST,
        post, 
        id
    }
}

export function deletePost (id) {
    return {
        type: DELETE_POST,
        id
    }
}

export function upVote (id) {
    return {
        type: UP_VOTE,
        id
    }
}

export function downVote (id) {
    return {
        type: DOWN_VOTE,
        id
    }
}

export function increment (id) {
    return {
        type: INCREMENT,
        id
    }
}

export function decrement (id) {
    return {
        type: DECREMENT,
        id
    }
}
