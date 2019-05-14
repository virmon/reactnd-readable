import React, { Component } from 'react'
import CommentItem from './CommentItem'

class CommentList extends Component {
    render () {
        const { comments } = this.props
        return (
            <div className='comment-list'>
                {
                    comments 
                        ? comments.map((comment) => 
                            <CommentItem 
                                key={comment.id}
                                author={comment.author}
                                body={comment.body}
                                timestamp={comment.timestamp}
                                voteScore={comment.voteScore} />
                    )   : []
                }
            </div>
        )
    }
}

export default CommentList