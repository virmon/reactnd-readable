import React, { Component } from 'react'
import PostItem from './PostItem'

class PostList extends Component {
    state = {
        sortBy: 'date',
        byDate: true
    }
    handleChange = (e) => {
        this.setState({
            sortBy: e.target.value
        })
        if (e.target.value === 'score') {
            this.setState({ 
              byDate: false
            })
        } else {
            this.setState({ 
                byDate: true
            })
        }
    }
    render () {
        const { data } = this.props
        return (
            <div className='post-list'>
                <select value={this.state.sortBy} onChange={this.handleChange}>
                    <option value='date'>SORT BY DATE</option>
                    <option value='score'>SORT BY SCORE</option>
                </select>
                {
                    data.length !== 0
                        ?   this.state.byDate 
                                ? data.sort((a,b) => b.timestamp - a.timestamp)
                                    .map((item) =>
                                    <PostItem 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title} 
                                        body={item.body} 
                                        author={item.author} 
                                        category={item.category} 
                                        timestamp={item.timestamp}
                                        voteScore={item.voteScore}
                                        commentCount={item.commentCount} />)
                                : data.sort((a,b) => b.voteScore - a.voteScore)
                                    .map((item) =>
                                    <PostItem 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title} 
                                        body={item.body} 
                                        author={item.author} 
                                        category={item.category} 
                                        timestamp={item.timestamp}
                                        voteScore={item.voteScore}
                                        commentCount={item.commentCount} />)
                        : <p>Nothing Found</p>
                }
            </div>
        )
    }
}

export default PostList