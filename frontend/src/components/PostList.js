import React, { Component } from 'react'
import PostItem from './PostItem'
// import { upVote, downVote } from '../actions/posts'
// import { connect } from 'react-redux'

class PostList extends Component {
    render () {
        const { data } = this.props
        return (
            <div className='post-list'>
                <h5>Sort by Date</h5>
                {
                    data.length !== 0
                        ?    data.map((item) =>
                                    <PostItem 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title} 
                                        body={item.body} 
                                        author={item.author} 
                                        category={item.category} 
                                        timestamp={item.timestamp}
                                        voteScore={item.voteScore}
                                        commentCount={item.commentCount} />
                        
                    ) : <p>Nothing Found</p>
                }
            </div>
        )
    }
}

export default PostList