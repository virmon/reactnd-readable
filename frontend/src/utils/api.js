export function _getCategories (url) {
    return fetch(url, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want' 
        }
    })
    .then((res) => res.json())
}

export function _getCategoryById (url, id) {
    return fetch(url, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then((res) => res.json())
}

export function _getPosts (url) {
    return fetch(url, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
    .then((res) => res.json())
}

export function _savePost (url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
}

export function getPost (id) {
    return fetch(`/posts/${id}`)
        .then((res) => res.json())
}

export function _editPost (url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
}

export function _delete (url, id) {
    return fetch(url, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: id
    })
    .then((res) => res.json())
}

export function _votePost (url, vote) {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(vote)
    })
    .then((res) => res.json())
}

export function _voteComment (url, vote) {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(vote)
    })
    .then((res) => res.json())
}

export function _addComment (url, comment) {
    return fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(comment)
    })
    .then((res) => res.json())
}

export function _editComment (url, comment) {
    return fetch(url, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify(comment)
    })
    .then((res) => res.json())
}