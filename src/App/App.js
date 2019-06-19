import React, { Component } from 'react'
import { put } from '../Http/Http.js'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
} from 'semantic-ui-react';
import './App.css'

class App extends Component {
  constructor() {
    super();
    // store any variables here
    this.state = {
      on: true,
      color: 0,
      colorName: 'black',
      brightness: 254,
      randInterId: 0,
      effect: "none",
      index: 0,
      colorMap: {
        "red": 65495,
        "orange": 3439,
        "yellow": 18700,
        "olive": 23222,
        "green": 25653,
        "teal": 37389,
        "blue": 44896,
        "violet": 46879,
        "purple": 46879,
        "pink": 57965,
        "white": 34160
      }
    };



    this.turnLightOff = this.turnLightOff.bind(this);
    this.randomRotation = this.randomRotation.bind(this);
    this.colorRotation = this.colorRotation.bind(this);
    this.colorLoop = this.colorLoop.bind(this);
  }

  turnLightOff() {
    put('/lights/1/state', { "on": !this.state.on })
      .then(this.setState({ on: !this.state.on }));  // store the light state
  }

  setColor(color, pulse = 'none') {

    let hue;
    if (color in this.state.colorMap) {
      hue = this.state.colorMap[color];
      this.setState({
        colorName: color
      })
    }
    console.log(this.state.colorName)
    this.loadLighting({ hue: hue, "alert": pulse });

    this.updateStatus(color)
  }

  updateStatus(color) {
    // Display active color

    let fontColor = '#ffffff';
    if (color === 'white') {
      fontColor = '#555555'
    }

    document.getElementById('currentState').style.color = fontColor;
  }

  setBrightness(brightEvent) {

    if (this.state.brightness >= 0 && this.state.brightness <= 254) {
      this.setState({ brightness: parseInt(brightEvent) })
    }

    this.loadLighting({ bri: parseInt(brightEvent) });
  }

  loadLighting(stateObject) {
    put('/lights/1/state', stateObject)
      .then(this.setState(stateObject));  // store the light state
    put('/lights/2/state', stateObject)
      .then(this.setState(stateObject));  // store the light state
  }

  renderStateButton() {

    if (this.state.on) {
      let brightness = "unset";
      if (this.state.bri <= 75) {
        brightness = "Dim"
      } else if (this.state.bri > 75 && this.state.bri <= 150) {
        brightness = "Mid"
      }
      else {
        brightness = "Bright"
      }

      return (<Button class="ui button" id="currentState" color={this.state.colorName}> {brightness}</Button>)
    } else {
      // off button
      return (<Button class="ui button" id="currentState" color={"black"}>OFF</Button>)
    }
  }

  colorRotation(argArr = []) {


    let colorKeys = ''
    if (argArr.length === 0) {
      colorKeys = Object.entries(this.state.colorMap);
      let index = Math.floor(Math.random() * colorKeys.length);

      this.setState({
        index: index
      }, () => {
        this.setColor(colorKeys[this.state.index][0]);
      })
      this.setState({
        interId: setTimeout(this.colorRotation, 5000)
      });
    } else {

      this.setState({
        index: this.state.index + 1
      }, () => {

        colorKeys = argArr[this.state.index][0];

        this.setColor(colorKeys[argArr[this.state.index][0]]);

        this.setState({
          interId: setTimeout(this.colorRotation, argArr[this.state.index][1])
        });
      })
    }


  };


  randomRotation() {

    if (this.state.on) {
      if (this.state.randInterId > 0) {
        clearInterval(this.state.interId);

        this.setState({
          randInterId: 0
        })

      } else {

        let interId = setTimeout(this.colorRotation, 3000);

        this.setState({
          randInterId: interId
        })
      }
    }

  }

  /*rotateColor(colorArr) {

    if (this.state.on) {
      if (this.state.randInterId > 0) {
        clearInterval(this.state.interId);

        this.setState({
          randInterId: 0
        })
      }

      let interId = setTimeout(this.randomColor, colorArr[0][1], colorArr);

      this.setState({
        randInterId: interId
      })
    }
  }*/

  moodLighting(mood) {
    let moodSetting = [];
    switch (mood) {
      case 'chilled':
        moodSetting = [
          ['red', 6000],
          ['purple', 3000],
          ['orange', 5000],
        ]
        break;

      case 'excited':
        moodSetting = [
          ['oange', 6000],
          ['yellow', 3000],
          ['red', 5000],
        ]
        break;
      case 'relaxed':
        moodSetting = [
          ['oange', 6000],
          ['yellow', 3000],
          ['red', 5000],
        ]
        break;

      case 'moody':
        moodSetting = [
          ['oange', 6000],
          ['yellow', 3000],
          ['red', 5000],
        ]
        break;
      default:
        break;
    }
    console.log(moodSetting)

  }

  colorLoop() {
    let effectState = 'none';
    if (this.state.effect === 'none') {
      effectState = 'colorloop';
    } else if (this.state.effect === 'colorloop') {
      effectState = 'none';
    }

    this.loadLighting({ effect: effectState })
    this.setState({
      effect: effectState
    })
  }

  render() {
    return (
      <div className='button_container'>
        <Button class="ui button" color={"red"} onClick={() => this.setColor("red", "select")}>Turn Red</Button>
        <Button class="ui button" color={"orange"} onClick={() => this.setColor("orange")}>Turn Orange</Button>
        <Button class="ui button" color={"yellow"} onClick={() => this.setColor("yellow")}>Turn Yellow</Button>
        <Button class="ui button" color={"green"} onClick={() => this.setColor("green")}>Turn Green</Button>
        <Button class="ui button" color={"olive"} onClick={() => this.setColor("olive")}>Turn Olive</Button>
        <Button class="ui button" color={"teal"} onClick={() => this.setColor("teal")}>Turn Olive</Button>
        <Button class="ui button" color={"blue"} onClick={() => this.setColor("blue")}>Turn Blue</Button>
        <Button class="ui button" color={"violet"} onClick={() => this.setColor("violet")}>Turn Violet</Button>
        <Button class="ui button" color={"purple"} onClick={() => this.setColor("purple")}>Turn Purple</Button>
        <Button class="ui button" color={"pink"} onClick={() => this.setColor("pink")}>Turn Pink</Button>
        <Button class="ui button" color={"white"} onClick={() => this.setColor("white")}>Turn White</Button>

        <div className="brightness-slider">
          <span>Brighten Up Your Mood</span>
          <label>Min
            <input type="range" min="0" max="254" value={this.state.brightness} onChange={(e) => {
              this.setBrightness(e.target.value)
            }} />
            Max
          </label>
        </div>
        <Button className='button' onClick={this.turnLightOff}>
          Toggle On/Off
        </Button>
        <Button className='button' onClick={this.randomRotation}>
          Toggle Random
        </Button>
        <Button className='button' onClick={this.colorLoop}>
          Toggle Color Scale
        </Button>
        <div className='mood-settings'>
          <Button class="ui button" color={"teal"} onClick={() => this.moodLighting("relaxed")}>Relaxed</Button>
        </div>
        {this.renderStateButton()}

        <p>{this.state.username}</p>
      </div>
    )
  }
}

export default App