import React, { Component } from 'react'
import Modal from './Modal/Modal'
import { Redirect } from 'react-router-dom'
import { _delete } from '../utils/api'
import { deletePost } from '../actions/posts'
import { deleteComment } from '../actions/comments'
import { connect } from 'react-redux'

const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

class ActionButtons extends Component {
    state = {
        toHome: false,
        toUpdate: false
    }
    handleEdit = (id) => {
        // const url = `${api}/posts/${id}`

        this.setState({ toUpdate: true })

        // go to NewPost with current data
    }
    handleDelete = (id) => {
        if (!this.props.commentId) {
            const url = `${api}/posts/${id}`
            _delete(url, id)
                .then(() => this.props.deletePost(id))
                .then((data) => {
                    if (data.commentCount !== 0) {
                        console.log('has comments')
                        const commentUrl = `${api}/comments/`
                        this.props.comments.map((comment) =>
                            _delete(commentUrl+comment.id, comment.id)
                                .then(() => this.props.deleteComment(comment.id))
                        )
                    }
                })
            this.setState({ toHome: true })
            console.log('DELETING', id)
        } else {
            const url = `${api}/comments/${this.props.commentId}`
            _delete(url, this.props.commentId)
                .then(() => this.props.deleteComment(this.props.commentId))
                console.log('DELETING', this.props.commentId)
        }
    }
    render () {
        const { id, title, body, author, category } = this.props
        if (this.state.toHome) {
            return <Redirect to='/' />
        }
        if (this.state.toUpdate) {
            return <Redirect to={{pathname:'/new', state:{title, body, author, id, category }}} />
        }
        return (
            <div>
                {
                    !this.props.commentId 
                        ? <span style={{color:'black'}} onClick={() => this.handleEdit(id)}>EDIT</span>
                        : <Modal commentId={this.props.commentId}>EDIT</Modal>
                }
                <span> </span>
                <span style={{color:'red'}} onClick={() => this.handleDelete(id)}>DELETE</span>
            </div>
        )
    }
}

function mapStateToProps ({ comments }) {
    return {
        comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        deleteComment: (id) => dispatch(deleteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)