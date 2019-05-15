import React from 'react'
import { formatDate } from '../utils/helpers'
import PostButton from './PostButton';

const PostItem = ({ title, body, author, category, timestamp, voteScore, commentCount }) => {
    return(
        <div className='card'>
            <div className='post-header'>
                <h3>{title}</h3>
                <span>{author} {formatDate(timestamp)}</span>
            </div>
            <div className='post-content'>
                <p>{body}</p>
                <p>{category}</p>
            </div>
            <PostButton voteScore={voteScore} commentCount={commentCount} />
        </div>
    )
}

export default PostItem