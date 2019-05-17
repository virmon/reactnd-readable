import React from 'react'
// import { Popover, Button } from 'antd'
import Modal from './Modal/Modal'
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'
import { FaEllipsisH } from 'react-icons/fa'

const PostButton = ({ voteScore, commentCount, parentId }) => {
    return (
        <div className='post-buttons'>
            <ul className='vote-button'>
                <li>{voteScore}</li>
                <li><TiThumbsUp className='post-icon'/></li>
                <li><TiThumbsDown className='post-icon'/></li>
            </ul>
            {
                <ul className='comment-button'>
                    {
                        commentCount !== undefined
                        ? <li style={{display: 'flex'}}><Modal parentId={parentId}>{commentCount === 1 ? commentCount + ' comment' : commentCount + ' comments'}</Modal></li>
                        : null
                    }
                    <li><FaEllipsisH className='post-icon'/></li>
                </ul>
            }
        </div>
    )
}

export default PostButton