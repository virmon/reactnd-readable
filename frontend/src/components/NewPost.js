import React, { Component } from 'react'
import { Redirect } from 'react-router-dom' 
import { _savePost, _editPost } from '../utils/api'
import { formatPost } from '../utils/helpers'
import { addPost, editPost } from '../actions/posts'
import { connect } from 'react-redux' 

class NewPost extends Component {
    state = {
        id: '',
        title: '',
        author: '',
        content: '',
        category: '',
        toHome: false
    }
    componentDidMount () {
        const data = this.props.location.state
        if (data) {
            this.setState({
                id: data.id,
                title: data.title,
                author: data.author,
                content: data.body,
                category: data.category
            })
        } else {
            return
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault()
        const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
        const { id, title, content, author, category } = this.state
        const data = this.props.location.state

        const post = {
            title,
            body: content,
            author,
            category
        }
        
        if (data === undefined) {
            const url = `${api}/posts`
            
            console.log('NEW POST', formatPost(post))
            _savePost(url, formatPost(post))
                .then(data => this.props.addPost(data))
                .catch(error => console.error(error))
        } else {
            const url = `${api}/posts/${id}`
            
            console.log('EDIT POST', formatPost(post, id))
            _editPost(url, formatPost(post, id))
                .then(data => this.props.editPost(data, id))
                .catch(error => console.error(error))
        }
        this.setState({ toHome: true })
    }
    render () {
        const { categories } = this.props
        const { title, author, content, category, toHome } = this.state
        if (toHome) {
            return <Redirect to={'/'} />
        }
        return (
            <div className='card new-post'>
                <h4>{this.props.location.state ? 'EDIT POST' : 'NEW POST'}</h4>
                <form onSubmit={this.submit}>
                    <input type='text' name='title' value={title} onChange={this.handleChange} placeholder='title' />
                    <input type='text' name='author' value={author} onChange={this.handleChange} placeholder='author' />
                    <input type='text' name='content' value={content} onChange={this.handleChange} placeholder='content' />
                    <select name='category' value={category} onChange={this.handleChange} className='selectCategory'>
                        <option value=''>Select category</option>
                        {
                            categories.map((cat) =>
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            )
                        }
                    </select>
                    <input type="submit" value="Save" className='btn'/>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({ categories }) {
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        editPost: (post, id) => dispatch(editPost(post, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)