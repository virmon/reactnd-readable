import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import PostButton from './PostButton';

const PostItem = ({ id, title, body, author, category, timestamp, voteScore, commentCount }) => {
    return(
        <div className='card'>
            <Link to={`/${category}/${id}`}>
                <div className='post-header'>
                    <h3>{title}</h3>
                    <span>{author} {formatDate(timestamp)}</span>
                </div>
                <div className='post-content'>
                    <p>{body}</p>
                    <p>{category}</p>
                    <p>{voteScore} score  {commentCount} comments</p>
                </div>
            </Link>
            <PostButton voteScore={voteScore} commentCount={commentCount} id={id} />
        </div>
    )
}

export default PostItem