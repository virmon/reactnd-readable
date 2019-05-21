# reactnd-readable

reactnd-readable is a content and comment web app. Users are able to post content, comment on their post and other's posts and vote on posts and comments. Users may also edit and delete posts and comments. Furthermore, users may sort list of contents by date and by score.

## Getting Started

* Download or clone the repository
    - `git clone https://github.com/virmon/reactnd-would-you-rather.git`
* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the pre-scaffolded Create React App project
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Access The API Server

To accesss the backend server in your code, we have stored the URL to the API server in the environment variable `REACT_APP_BACKEND` which you can access in your code using `process.env.REACT_APP_BACKEND`. In order for your project to run outside of the Workspace, you need to handle the case where the environment variable is not set. You can do it like this: `const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001'`. 

To run inside the Workspace, please include the credentials. For example:

  ```js
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
    const url = `${api}/categories`;
    console.log("fetching from url", url);
    fetch(url, {
      headers: { Authorization: "whatever-you-want" },
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        this.setState({ backend: data });
      });
  }
  ```

To run outside of the Workspace, please do not include the credentials. For example:

  ```js
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
    const url = `${api}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }
  ```

You can see this in action in `frontend/src/App.js` in `componentDidMount`.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).