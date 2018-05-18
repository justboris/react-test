import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';


const urlForUsername = username =>
  `http://af-react:9040/api/${username}?_format=json`

class App extends React.Component {
  constructor(props) {
    super(props);
    // Setting up initial state
    this.state = {
      requestFailed: false
    }
  }
   
  // calling the componentDidMount() method after a component is rendered for the first time
  componentDidMount() {
    // var th = this;
    // $.getJSON("http://af-react:9040/api/events?_format=json", function(json) {
    //   this.setState({user: json})
    // })
    // // this.serverRequest = axios.get(this.props.source)
    // .then(function(event) { 
    //    th.setState({
    //        data: event.data
    //    });

    // })
    axios.get(urlForUsername(this.props.username))
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({
         posts
          })
      });
  }
  // calling the componentWillUnMount() method immediately before a component is unmounted from the DOM
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    //set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
        This is the event list  

        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/thing" component={Thing} subreddit="event"/>
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>

    );


  // const country = this.state.data.title[0].value;
    // if (this.state.data.field_city.value || this.state.data.field_city.length) {
    //   city = this.state.data.field_city[0].value;
    // }
    // const eventlists = this.state.data.map((data,i) =>

    //     <div key={i}>Something goes here
    //     <a href={location + data.path[0].alias.toString()}>
    //     {data.title[0].value}</a>
    //     <p>{data.field_city[0] ? (data.field_city[0].value.toString()):('nah')}</p>
    //     <p>{data.field_subtitle[0] ? (data.field_subtitle[0].value.toString()):('nah')}</p>
    //     <p>{data.field_summary[0] ? (data.field_summary[0].value.toString()):('nah')}</p>
    //     </div>


    // )
    return (
      <div className="container">
        <div className="row">
           <div className="col-md-6 col-md-offset-5">
              <h1 className="title">All Events</h1>
           </div>
        </div>
      </div>
    );
  } 
}

const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

const Thumbnail = ({ color }) => (
  <div
    style={{
      width: 50,
      height: 50,
      background: color
    }}
  />
);

const Image = ({ color }) => (
  <div
    style={{
      width: "100%",
      height: 400,
      background: color
    }}
  />
);

const Home = () => (
  <div>
    <Link to="/gallery">Visit the Gallery</Link>
    <Link to="/thing">Visit the Thing</Link>
    <h2>Featured Images</h2>
    <ul>
      <li>
        <Link to="/img/2">Tomato</Link>
      </li>
      <li>
        <Link to="/img/4">Crimson</Link>
      </li>
    </ul>
  </div>
);

const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: '/img/${i.id}',
          // this is the trick!
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);

const Thing = this.state.post.map((data,i) =>

    <div key={i}>Something goes here
    <a href={data.path[0].alias.toString()}>
    {data.title[0].value}</a>
    <p>{data.field_city[0] ? (data.field_city[0].value.toString()):('nah')}</p>
    <p>{data.field_subtitle[0] ? (data.field_subtitle[0].value.toString()):('nah')}</p>
    <p>{data.field_summary[0] ? (data.field_summary[0].value.toString()):('nah')}</p>
    </div>


)
// const Thing = () => (
//   <div>
//     {this.state.posts.map((post,i) => (
//       <Link
//         key={i.id}
//         to={{
//           pathname: '/img/${post.field_city[0].value.toString()}',
//           // this is the trick!
//           state: { modal: true }
//         }}
//       >
//         <Thumbnail color={i.color} />
//         <p>{i.title}</p>
//       </Link>
//     ))}
//   </div>
// )


const ImageView = ({ match }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
};

const Modal = ({ match, history }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return null;
  }
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <div
      onClick={back}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
};

const ModalGallery = () => (
  <Router>
    <Route component={App}  />
  </Router>
);

//rendering into the DOM
// ReactDOM.render(
//    <App subreddit="event" />, 
//    document.getElementById('root')
// );
export default ModalGallery;
