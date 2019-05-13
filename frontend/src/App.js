import React, { Component } from "react";
import PostList from './components/PostList'
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
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
    const url = `${api}/posts`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.json()) })
      .then((data) => {
        this.setState({backend: data});
      });

  }
  

  render() {
    console.log(this.state.backend)
    return (
      <div className="App">
        <PostList data={this.state.backend} />
      </div>
    );
  }
}

export default App;