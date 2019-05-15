import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CommentList from './CommentList'
import PostButton from './PostButton'
import { deletePost } from '../actions/posts'
import { receiveComments } from '../actions/comments'
import { _deletePost } from '../utils/api'
import { formatDate } from '../utils/helpers'
import { connect } from 'react-redux'

const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

class PostDetail extends Component {
    state = {
        toHome: false
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
        return (
            <div className='card'>
                <div className='post-item'>
                    <div className='post-header'>
                        <h3>{title}</h3>
                        <span>{author} {formatDate(timestamp)}</span>
                    </div>
                    <div className='post-content'>
                        <p>{body}</p>
                        <p>{category}</p>
                        <h5 style={{color:'red'}} onClick={() => this.handleDelete(id)}>DELETE</h5>
                    </div>
                    <PostButton voteScore={voteScore} commentCount={commentCount}/>
                    <div className='comment-section'>
                        <div className='comment-item'>
                            <input type='text' placeholder='comment' />
                        </div>
                        <CommentList comments={comments} />
                    </div>
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
        comments,
        id
    }
}

function mapDispatchToProps (dispatch) {
    return {
        receiveComments: (comments) => dispatch(receiveComments(comments)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)