import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import PostButton from './PostButton'
import ActionButtons from './ActionButtons'

const PostItem = ({ id, title, body, author, category, timestamp, voteScore, commentCount }) => {
    return(
        <div className='card'>
            <Link to={`/${category}/${id}`}>
                <div className='post-header'>
                    <h3>{title}</h3>
                    <span className='post-timestamp'>{author} {formatDate(timestamp)}</span>
                </div>
                <div className='post-content'>
                    <p className='post-body'>{body}</p>
                    <p className='post-category'><i>{category}</i></p>
                    <p className='post-counter'>{voteScore} score  {commentCount} comments</p>
                </div>
            </Link>
            <div className='post-content'>
                <ActionButtons id={id} title={title} body={body} author={author} category={category} home={true} />
            </div>
            <PostButton voteScore={voteScore} commentCount={commentCount} id={id} />
        </div>
    )
}

export default PostItem