import React from 'react'

const PostItem = ({ title, body, author, category, timestamp, voteScore, commentCount }) => {
    return(
        <div className='post-item'>
            <div>
                <h3>{title}</h3>
                <h4>{category}</h4>
            </div>
            <p>{body}</p>
            <span>{author}</span>
            <h5>{timestamp}</h5>
            <div>
                <h5>{voteScore} Vote Score</h5>
                <h5>{commentCount} Comments</h5>
            </div>
        </div>
    )
}

export default PostItem