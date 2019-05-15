import React, { Component } from 'react'
import CommentList from './CommentList'
import PostButton from './PostButton'
import { receiveComments } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import { connect } from 'react-redux'

class PostDetail extends Component {
    componentDidMount () {
        const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
        const id = this.props.match.params.id
        const url = `${api}/posts/${id}/comments`
        console.log('fetching from url', url)
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
        .then( (res) => { return(res.json()) })
        .then((data) => {
            this.props.receiveComments(data)
        });
    }
    render () {
        const { title, body, author, category, timestamp, voteScore, commentCount, comments } = this.props
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
        comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        receiveComments: (comments) => dispatch(receiveComments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)