import React from 'react'
import PostButton from './PostButton'
import { formatDate } from '../utils/helpers';

const CommentItem = ({ id, author, body, timestamp, voteScore }) => {
    return (
        <div className='comment-item'>
            <h4>{author} {formatDate(timestamp)}</h4>
            <p>{body}</p>
            <p>{voteScore} score</p>
            <PostButton voteScore={voteScore} commentId={id} />
        </div>
    )
}

export default CommentItem