export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatPost (post, id) {
    return {
        id: !id ? generateUID() : id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
    }
}

export function formatComment (comment, id) {
    if (!id) {
        return {
            id: generateUID(),
            timestamp: Date.now(),
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId
        }
    } else {
        return {
            timestamp: Date.now(),
            body: comment.body
        }
    }
}

export function validatePost(title, body, author, category) {
    return {
        title: title ? title.length === 0 : true,
        body: body ? body.length === 0 : true,
        author: author ? author.length === 0: true,
        category: category ? category.length === 0 : true
    }
}

export function validateComment(author, body) {
    return {
        author: author ? author.length === 0 : true,
        body: body ? body.length === 0 : true
    }
}