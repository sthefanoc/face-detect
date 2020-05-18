import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
// import { render } from '@testing-library/react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '5443181edb444d51a8a51c21e4ab367b'
 });


const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topLine: clarifaiFace.top_row * height,
      bottomLine: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        // "a403429f2ddf4b49b307e318f00e528b", 
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
                // id: '123'
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
          // this.calculateFaceLocation();
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
      // this.setState({route: 'signin'})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route.toLocaleLowerCase()});
    // this.setState({route: route});
    console.log(route);
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    const output =[];

    if (route === 'home') {
      output.push(
        <div>
          <Logo />
          <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition 
            box={box} 
            imageUrl={imageUrl} />
        </div>
      )
    } else if (route === 'signin') {
      output.push(<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
    } else if (route === 'register') {
      output.push(<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
    } else if (route === 'signout') {
      output.push(<SignIn onRouteChange={this.onRouteChange}/>)
    } else { 
      output.push(<div>Error! Please try refreshing the page.</div>)
    }

    return (
      <div className="App">
        <Particles className="particles" params={ particleOptions } />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} route={route} />
        {output[0]}
      </div>
    );
  }
}

export default App;
