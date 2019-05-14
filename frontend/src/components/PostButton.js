import React from 'react'
import { TiMessage, TiThumbsUp, TiThumbsDown } from 'react-icons/ti'

const PostButton = ({ voteScore, commentCount }) => {
    return (
        <div className='post-buttons'>
            <ul className='vote-button'>
                <li>{voteScore}</li>
                <li><TiThumbsUp className='post-icon'/></li>
                <li><TiThumbsDown className='post-icon'/></li>
            </ul>
            {
                commentCount !== undefined
                    ?   <ul className='comment-button'>
                            <li>{commentCount}</li>
                            <li><TiMessage className='post-icon'/></li>
                        </ul>
                    :   null
            }
        </div>
    )
}

export default PostButton