import React, { Component } from 'react'
import { formatComment } from '../../utils/helpers'
import { _addComment } from '../../utils/api'
import { addComment } from '../../actions/comments'
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
        const url = `${api}/comments`
        const comment = {
            body: content,
            author,
            parentId: this.props.parentId
        }
        console.log(formatComment(comment))
        _addComment(url, formatComment(comment))
            .then(data => {
                this.props.addComment(data)
                this.props.increment(data.parentId)
            })
        this.setState({ isOpen: false })
    }
    render () {
        const { isOpen } = this.state
        return (
            <div>
                <span id="myBtn" onClick={this.handleOpenModal}>
                    {this.props.children}
                </span>
                <div id="myModal" className='modal' style={{display:isOpen ? 'block' : 'none'}}>
                    <div className="modal-content">
                        <span className="close" onClick={this.handleOpenModal}>&times;</span>
                        <form onSubmit={this.comment} className='new-comment'>
                            <input type='text' name='author' value={this.state.author} onChange={this.handleChange} placeholder='author' />
                            <input type='text' name='content' value={this.state.content} onChange={this.handleChange} placeholder='comment' />
                            <input type='submit' value='Comment' className='btn'/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ posts, comments }, {parentId}) {
    return {
        comments: !comments ? [] : comments.sort((a,b) => b.timestamp - a.timestamp),
        parentId
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
        increment: (id) => dispatch(increment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)