import React, { Component } from 'react'
import PostItem from './PostItem'

class PostList extends Component {
    render () {
        const { data } = this.props
        console.log(data)
        return (
            <div className='post-list'>
                NAVIGATION HERE
                {
                    data.map((item) => 
                        <PostItem 
                            key={item.id}
                            title={item.title} 
                            body={item.body} 
                            author={item.author} 
                            category={item.category} 
                            timestamp={item.timestamp}
                            voteScore={item.voteScore}
                            commentCount={item.commentCount} />
                    )
                }
            </div>
        )
    }
}

export default PostList