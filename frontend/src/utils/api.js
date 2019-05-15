export function getCategories (url) {
    fetch(`${url}`, {
        headers: { 
            'Authorization': 'whatever-you-want' 
        }
    })
    .then((res) => res.json())
}

export function getCategoryById (id) {
    fetch(`/${id}/posts`)
        .then((res) => res.json())
}

export function getPosts () {
    fetch('/posts')
        .then((res) => res.json())
}

export function savePost (url, data) {
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
    fetch(`/posts/${id}`)
        .then((res) => res.json())
}

export function editPost (id) {
    fetch(`/posts/${id}`, {
        method: 'PUT'
    })
        .then((res) => res.json())
}

export function _deletePost (url, id) {
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

