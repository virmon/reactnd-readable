import React, { Component } from 'react'
// import { Popover, Button } from 'antd'
import Modal from './Modal/Modal'
import { TiMessage, TiThumbsUp, TiThumbsDown } from 'react-icons/ti'
import { FaEllipsisH } from 'react-icons/fa'
import { upVote, downVote } from '../actions/posts'
import { upVoteComment, downVoteComment } from '../actions/comments'
import { _votePost, _voteComment } from '../utils/api'
import { connect } from 'react-redux'

const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

class PostButton extends Component {
    upVote = () => {
        if (!this.props.commentId) {
            const url = `${api}/posts/`
            console.log('fetching from url', url)
            _votePost(url+this.props.id, {option: 'upVote'})
                .then(data => this.props.upVote(data.id))
                .catch(error => console.error(error))
        } else {
            const url = `${api}/comments/`
            _voteComment(url+this.props.commentId, {option: 'upVote'})
                .then(data => this.props.upVoteComment(data.id))
                .catch(error => console.error(error))
        }
        
    }
    downVote = () => {
        if (!this.props.commentId) {
            const url = `${api}/posts/`
            _votePost(url+this.props.id, {option: 'downVote'})
                .then(data => this.props.downVote(data.id))
                .catch(error => console.error(error))
        } else {
            const url = `${api}/comments/`
            _voteComment(url+this.props.commentId, {option: 'downVote'})
                .then(data => this.props.downVoteComment(data.id))
                .catch(error => console.error(error))
        }
    }
    render () {
        const { id } = this.props
        return (
            <div className='post-buttons'>
                <ul className='vote-button'>
                    <li><TiThumbsUp className='post-icon' onClick={this.upVote}/></li>
                    <li><TiThumbsDown className='post-icon' onClick={this.downVote}/></li>
                </ul>
                {
                    <ul className='comment-button'>
                        {id ? <li><Modal parentId={id}><TiMessage className='post-icon'/></Modal></li> : null}
                        <li><FaEllipsisH className='post-icon'/></li>
                    </ul>
                }
            </div>
        )
    }
}

function mapStateToProps ({ posts }) {
    return {
        posts
    }
}

function mapDispatchToProps (dispatch) {
    return {
        upVote: (id) => dispatch(upVote(id)),
        downVote: (id) => dispatch(downVote(id)),
        upVoteComment: (id) => dispatch(upVoteComment(id)),
        downVoteComment: (id) => dispatch(downVoteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostButton)