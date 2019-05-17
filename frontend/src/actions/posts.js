export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const INCREMENT_VOTE = 'INCREMENT_VOTE'
export const DECREMENT_VOTE = 'DECREMENT_VOTE'

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

export function incrementVote (vote) {
    return {
        type: INCREMENT_VOTE,
        vote
    }
}

export function decrementVote (vote) {
    return {
        type: DECREMENT_VOTE,
        vote
    }
}