import React from 'react'
import PostButton from './PostButton'
import { formatDate } from '../utils/helpers';

const CommentItem = ({ author, body, timestamp, voteScore }) => {
    return (
        <div className='comment-item'>
            <h4>{author} {formatDate(timestamp)}</h4>
            <p>{body}</p>
            <PostButton voteScore={voteScore} />
        </div>
    )
}

export default CommentItem