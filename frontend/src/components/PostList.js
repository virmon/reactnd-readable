import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PostItem from './PostItem'

class PostList extends Component {
    render () {
        const { data } = this.props
        console.log(data)
        return (
            <div className='post-list'>
                {
                    data.map((item) => 
                        <Link to={`/${item.id}`}>
                            <PostItem 
                                key={item.id}
                                title={item.title} 
                                body={item.body} 
                                author={item.author} 
                                category={item.category} 
                                timestamp={item.timestamp}
                                voteScore={item.voteScore}
                                commentCount={item.commentCount} />
                        </Link>
                    )
                }
            </div>
        )
    }
}

export default PostList