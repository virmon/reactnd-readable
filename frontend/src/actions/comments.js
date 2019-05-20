export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

export function receiveComments (comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function editComment (id) {
    return {
        type: EDIT_COMMENT,
        id
    }
}

export function deleteComment (id) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function upVoteComment (id) {
    return {
        type: UP_VOTE_COMMENT,
        id
    }
}

export function downVoteComment (id) {
    return {
        type: DOWN_VOTE_COMMENT,
        id
    }
}