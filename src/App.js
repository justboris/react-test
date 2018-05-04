import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor() {
     super();
     // Setting up initial state
     this.state = {
        data: []
     }
  }
   
  // calling the componentDidMount() method after a component is rendered for the first time
  componentDidMount() {
    var th = this;
    this.serverRequest = axios.get(this.props.source)
    .then(function(event) { 
       th.setState({
           data: event.data
       });
    })
  }
  // calling the componentWillUnMount() method immediately before a component is unmounted from the DOM
  componentWillUnmount() {
    this.serverRequest.abort();
  }
 
render() {
  var site = 'http://af-react:9040'
  var combines = []
  this.state.data.forEach(item => {
    combines.push(<p key={item.nid[0].value.toString}><a href={site + item.path[0].alias} >{item.title[0].value}</a></p> );
  })
  return (
    <div className="container">
      <div className="row">
         <div className="col-md-6 col-md-offset-5">
             <h1 className="title">All Events</h1>
             {combines}
         </div>
      </div>
    </div>
  );
  } 
}

// rendering into the DOM
ReactDOM.render(
   <App source="http://af-react:9040/api/events?_format=json" />, 
   document.getElementById('root')
);
export default App;
