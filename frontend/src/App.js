import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import NewPost from './components/NewPost'
import Nav from './components/Nav'
import { receivePosts } from './actions/posts'
import { _getPosts, _getCategoryById } from './utils/api'
import { connect } from 'react-redux'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: []
    };
  }

  //To run inside the Workspace, please include the credentials.
  
  // componentDidMount() {
  //   const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
  //   const url = `${api}/categories`;
  //   console.log("fetching from url", url);
  //   fetch(url, {
  //     headers: { Authorization: "whatever-you-want" },
  //     credentials: "include"
  //   })
  //     .then(res => {
  //       return res.text();
  //     })
  //     .then(data => {
  //       this.setState({ backend: data });
  //     });
  // }

  // To run outside of the Workspace, please do not include the credentials.

  
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
    const url = `${api}/posts`
    console.log('fetching from url', url)
    _getPosts(url)
      .then((data) => {
        this.setState({backend: data})
        this.props.receivePosts(data)
      });
  }
  
  handleCategory = (cat) => {
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
    let url
    if (cat === 'all') {
      url = `${api}/posts`
    } else {
      url = `${api}/${cat}/posts`
    }
    _getCategoryById(url)
      .then((data) => {
          this.props.receivePosts(data)
      });
  }

  render() {
    const { posts, categories } = this.props
    // console.log(posts)
    return (
      <Router>
        <div className='app'>
          <Nav categories={categories} handleCategory={this.handleCategory}/>
          <Switch>
            <Route exact path='/' render={() => 
              <PostList data={posts} />
            }/>
            <Route path='/new' component={NewPost} />
            <Route path='/:category/:id' component={PostDetail} />
            <Route path='/:category' render={() => 
              <PostList data={posts} />
            }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: !posts ? [] : posts.sort((a,b) => b.timestamp - a.timestamp),
    categories: !categories ? [] : categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receivePosts: (posts) => dispatch(receivePosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);