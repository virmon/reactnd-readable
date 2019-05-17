import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PostItem from './PostItem'

class PostList extends Component {
    render () {
        const { data } = this.props
        return (
            <div className='post-list'>
                <h5>Sort by Date</h5>
                {
                    data.length !== 0
                        ?    data.map((item) => 
                                <Link key={item.id} to={`/${item.category}/${item.id}`}>
                                    <PostItem 
                                        id={item.id}
                                        title={item.title} 
                                        body={item.body} 
                                        author={item.author} 
                                        category={item.category} 
                                        timestamp={item.timestamp}
                                        voteScore={item.voteScore}
                                        commentCount={item.commentCount} />
                                </Link>
                        
                    ) : <p>Nothing Found</p>
                }
            </div>
        )
    }
}

export default PostList