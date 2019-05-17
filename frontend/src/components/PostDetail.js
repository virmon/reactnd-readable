import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CommentList from './CommentList'
import PostButton from './PostButton'
import { deletePost } from '../actions/posts'
import { receiveComments, addComment } from '../actions/comments'
import { _deletePost, _addComment } from '../utils/api'
import { formatDate, formatComment } from '../utils/helpers'
import { connect } from 'react-redux'

const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

class PostDetail extends Component {
    state = {
        content: '',
        author: '',
        toHome: false,
        toUpdate: false
    }
    componentDidMount () {
        const id = this.props.match.params.id
        const url = `${api}/posts/${id}/comments`
        console.log('fetching from url', url)
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
        .then( (res) => { return(res.json()) })
        .then((data) => {
            this.props.receiveComments(data)
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    comment = (e) => {
        e.preventDefault()
        const { author, content } = this.state
        const url = `${api}/comments`
        const comment = {
            body: content,
            author,
            parentId: this.props.id
        }
        console.log(formatComment(comment))
        _addComment(url, formatComment(comment))
            .then(data => this.props.addComment(data))
            .catch(error => console.error(error))
    }
    handleEdit = (id) => {
        const url = `${api}/posts/${id}`

        this.setState({ toUpdate: true })

        // go to NewPost with current data
    }
    handleDelete = (id) => {
        const url = `${api}/posts/${id}`
        
        _deletePost(url, id)
            .then(() => this.props.deletePost(id))

        this.setState({ toHome: true })
    }
    render () {
        const { id, title, body, author, category, timestamp, voteScore, commentCount, comments } = this.props
        if (this.state.toHome) {
            return <Redirect to='/' />
        }
        if (this.state.toUpdate) {
            return <Redirect to={{pathname:'/new', state:{title, body, author, id, category }}} />
        }
        return (
                <div className='card post-item'>
                    <div className='post-header'>
                        <h3>{title}</h3>
                        <span>{author} {formatDate(timestamp)}</span>
                    </div>
                    <div className='post-content'>
                        <p>{body}</p>
                        <p>{category}</p>
                        <p style={{color:'blue'}} onClick={() => this.handleEdit(id)}>EDIT</p>
                        <p style={{color:'red'}} onClick={() => this.handleDelete(id)}>DELETE</p>
                    </div>
                    <PostButton voteScore={voteScore} commentCount={commentCount} parentId={id} />
                    <div className='comment-section'>
                        <CommentList comments={comments} />
                    </div>
                </div>
        )
    }
}

function mapStateToProps ({ posts, comments }, {match}) {
    const id = match.params.id
    const data = !posts ? [] : posts
    const post = data.filter((post) => post.id === id)
    return {
        title: post[0] ? post[0].title : '',
        author: post[0] ? post[0].author : '',
        body: post[0] ? post[0].body : '',
        category: post[0] ? post[0].category : '',
        timestamp: post[0] ? post[0].timestamp : '',
        voteScore: post[0] ? post[0].voteScore : '',
        commentCount: post[0] ? post[0].commentCount : '',
        comments: !comments ? [] : comments.sort((a,b) => b.timestamp - a.timestamp),
        id
    }
}

function mapDispatchToProps (dispatch) {
    return {
        receiveComments: (comments) => dispatch(receiveComments(comments)),
        deletePost: (id) => dispatch(deletePost(id)),
        addComment: (comment) => dispatch(addComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)