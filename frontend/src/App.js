import React, { Component } from "react";
import PostList from './components/PostList'
import { receivePosts } from './actions/posts'
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
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.json()) })
      .then((data) => {
        this.setState({backend: data})
          this.props.receivePosts(data)
      });
  }
  
  handleCategory = (cat) => {
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'
    const url = `${api}/${cat}/posts`
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.json()) })
      .then((data) => {
          this.props.receivePosts(data)
      });
  }

  render() {
    const { posts } = this.props
    console.log(posts)
    return (
      <div className="App">
        <PostList data={posts} />
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: !posts ? [] : posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receivePosts: (posts) => dispatch(receivePosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);