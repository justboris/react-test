import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
     super(props);
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
    const site = 'http://af-react:9040';
  // const country = this.state.data.title[0].value;
    // if (this.state.data.field_city.value || this.state.data.field_city.length) {
    //   city = this.state.data.field_city[0].value;
    // }
    const eventlists = this.state.data.map((data,i) =>

        <div key={i}>
        <a href={site + data.path[0].alias.toString()}>
        {data.title[0].value}</a>
        <p>{data.field_city[0] ? (data.field_city[0].value.toString()):('nah')}</p>
        <p>{data.field_subtitle[0] ? (data.field_subtitle[0].value.toString()):('nah')}</p>
        <p>{data.field_summary[0] ? (data.field_summary[0].value.toString()):('nah')}</p>
        </div>


    )
    return (
      <div className="container">
        <div className="row">
           <div className="col-md-6 col-md-offset-5">
              <h1 className="title">All Events</h1>
              {eventlists}
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
