import React, { Component, Fragment } from 'react'
import { formatComment, validateComment } from '../../utils/helpers'
import { _addComment, _editComment } from '../../utils/api'
import { addComment, editComment } from '../../actions/comments'
import { increment } from '../../actions/posts'
import { connect } from 'react-redux'
import './modal.css'

class Modal extends Component {
    state = {
        isOpen: false,
        content: '',
        author: '',
        toHome: false,
        toUpdate: false
    }
    handleOpenModal = () => {
        const { isOpen } = this.state
        const { comment, commentId } = this.props
        if (commentId) {
            this.setState({
                author: comment[0].author,
                content: comment[0].body
            })
        }
        isOpen
            ? this.setState({ isOpen: false })
            : this.setState({ isOpen: true })
        
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    comment = (e) => {
        e.preventDefault()
        const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
        const { author, content } = this.state
        const comment = {
            body: content,
            author,
            parentId: !this.props.parentId ? this.props.comment[0].parentId : this.props.parentId
        }

        if (!this.props.commentId) {
            const url = `${api}/comments`
            console.log('ADD COMMENT', formatComment(comment))
            _addComment(url, formatComment(comment))
                .then(data => {
                    this.props.addComment(data)
                    this.props.increment(data.parentId)
                    this.setState({ isOpen: false, content: '', author: '' })
                })
            
        } else {
            const url = `${api}/comments/${this.props.commentId}`
            console.log('EDIT COMMENT', formatComment(comment, this.props.commentId))
            _editComment(url, formatComment(comment, this.props.commentId))
                .then(data => {
                    this.props.editComment(data)
                    this.setState({ isOpen: false, content: '', author: '' })
                })
        }
    }
    render () {
        const { isOpen, author, content } = this.state
        const { commentId } = this.props
        const errors = validateComment(author, content)
        const isEnabled = !Object.keys(errors).some(x => errors[x])
        return (
            <Fragment>
                <span id="myBtn" onClick={this.handleOpenModal}>
                    {this.props.children}
                </span>
                <div id="myModal" className='modal' style={{display:isOpen ? 'block' : 'none'}}>
                    <div className="modal-content">
                        <span className="close" onClick={this.handleOpenModal}>&times;</span>
                        <form onSubmit={this.comment} className='new-comment'>
                            <input type='text' name='author' value={this.state.author} onChange={this.handleChange} placeholder='author' disabled={!commentId ? false : true}/>
                            <input type='text' name='content' value={this.state.content} onChange={this.handleChange} placeholder='comment' />
                            <input type='submit' value='Comment' className='btn' disabled={!isEnabled}/>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({ posts, comments }, {match, parentId, commentId}) {
    // const parentId = match.params.id
    return {
        comments: !comments ? [] : comments.sort((a,b) => b.timestamp - a.timestamp),
        parentId,
        comment: !comments ? null : comments.filter((comment) => comment.id === commentId),
        commentId
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
        increment: (id) => dispatch(increment(id)),
        editComment: (comment) => dispatch(editComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)