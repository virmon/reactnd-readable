import React, { Component } from 'react'
import { savePost } from '../utils/api'
import { formatPost } from '../utils/helpers'
import { addPost } from '../actions/posts'
import { connect } from 'react-redux' 

class NewPost extends Component {
    state = {
        title: '',
        author: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        const { title, content, author } = this.state
        const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
        const url = `${api}/posts`
        e.preventDefault()
        const post = {
            title,
            body: content,
            author,
            category: 'react'
        }
        console.log(formatPost(post))
        savePost(url, formatPost(post))
            .then(data => this.props.addPost(data))
            .catch(error => console.error(error))
    }
    render () {
        const { title, author, content } = this.state
        return (
            <div className='new-post'>
                <form>
                    <input type='text' name='title' value={title} onChange={this.handleChange} placeholder='title' />
                    <input type='text' name='author' value={author} onChange={this.handleChange} placeholder='author' />
                    <input type='text' name='content' value={content} onChange={this.handleChange} placeholder='content' />
                    <button onClick={this.submit}></button>
                </form>
            </div>
        )
    }
}

function mapStateToProps () {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)