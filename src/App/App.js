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
			on1: true,
			on2: true,
			lightCount: 0,
			color: 0,
			colorName: 'black',
			brightness: 254,
			colorInterId: 0,
			effect: "none",
			pulseInterId: 0,
			pulseCycle: true,
			index: -1,
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
		this.moodRotation = this.moodRotation.bind(this);
		this.colorPulse = this.colorPulse.bind(this);
		this.pulseCycle = this.pulseCycle.bind(this);
		this.toggleLights = this.toggleLights.bind(this);
		this.killAllIntervals = this.killAllIntervals.bind(this);
	}

	turnLightOff() {

		if (this.state.lightCount === 1) {
			put('/lights/1/state', { "on": !this.state.on1 })
				.then(this.setState({ on1: !this.state.on1 }));  // store the light state
			put('/lights/2/state', { "on": false })
				.then(this.setState({ on2: false }));  // store the light state
		} else if (this.state.lightCount === 2) {
			put('/lights/2/state', { "on": !this.state.on2 })
				.then(this.setState({ on2: !this.state.on2 }));  // store the light state
			put('/lights/1/state', { "on": false })
				.then(this.setState({ on1: false }));  // store the light state
		} else {

			put('/lights/1/state', { "on": !this.state.on1 })
				.then(this.setState({ on1: !this.state.on1 }));  // store the light state
			put('/lights/2/state', { "on": !this.state.on2 })
				.then(this.setState({ on2: !this.state.on2 }));  // store the light state

		}
	}

	// Set color
	setColor(color) {

		let hue;
		if (color in this.state.colorMap) {
			hue = this.state.colorMap[color];
			this.setState({
				colorName: color
			})
		}

		this.loadLighting({ hue: hue });

		// fix font color while button is white
		let fontColor = '#ffffff';
		if (color === 'white') {
			fontColor = '#555555'
		}

		document.getElementById('button-currentState').style.color = fontColor;
	}

	// Sets brightness setting
	setBrightness(brightEvent) {

		if (this.state.brightness >= 0 && this.state.brightness <= 254) {
			this.setState({ brightness: parseInt(brightEvent) })
		}

		this.loadLighting({ bri: parseInt(brightEvent) });
	}

	setColorScale(colorScale) {

		if (this.state.color >= 0 && this.state.color <= 65495) {
			this.setState({ color: parseInt(colorScale) })
		}

		this.loadLighting({ hue: parseInt(colorScale) });
	}

	// Loads all states
	loadLighting(stateObject) {
		if (this.state.lightCount === 1) {
			put('/lights/1/state', stateObject)
				.then(this.setState(stateObject));  // store the light state
		} else if (this.state.lightCount === 2) {
			put('/lights/2/state', stateObject)
				.then(this.setState(stateObject));  // store the light state
		} else {
			put('/lights/1/state', stateObject)
				.then(this.setState(stateObject));  // store the light state
			put('/lights/2/state', stateObject)
				.then(this.setState(stateObject));  // store the light state
		}
	}

	// displays active color
	renderStateButton() {

		if (this.state.on1 || this.state.on2) {
			let brightness = "unset";
			if (this.state.bri <= 75) {
				brightness = "Dim"
			} else if (this.state.bri > 75 && this.state.bri <= 150) {
				brightness = "Mid"
			} else {
				brightness = "Bright"
			}

			return (<Button class="ui button" id="button-currentState" color={this.state.colorName}> {brightness}</Button>)
		} else {
			// off button
			return (<Button class="ui button" id="button-currentState" color={"black"}>OFF</Button>)
		}
	}

	// Rotate col or sequence
	colorRotation(argArr = []) {


		if (argArr.length === 0) {
			let colorKeys = '';
			colorKeys = Object.entries(this.state.colorMap);
			let index = Math.floor(Math.random() * colorKeys.length);

			this.setState({
				index: index
			}, () => {
				this.setColor(colorKeys[this.state.index][0]);
			});
			this.setState({
				colorInterId: setTimeout(this.colorRotation, 5000)
			});
		} else {


			let theIndex = -1;
			if (this.state.index >= (argArr.length - 1)) {
				theIndex = 0;
			} else {
				theIndex = this.state.index + 1
			}

			this.setState({
				index: theIndex
			}, () => {


				this.setColor(argArr[this.state.index].color);

				this.setState({
					colorInterId: setTimeout(this.colorRotation, argArr[this.state.index].duration, argArr)
				});
			})
		}
	};

	// toggle random color sequence
	randomRotation() {

		if (this.state.on1 || this.state.on2) {
			if (this.state.colorInterId > 0) {
				clearInterval(this.state.colorInterId);

				this.setState({
					colorInterId: 0
				})

			} else {

				let interId = setTimeout(this.colorRotation, 3000);

				this.setState({
					colorInterId: interId
				})
			}
		}
	}


	moodRotation(colorArr) {

		if (this.state.on1 || this.state.on2) {
			if (this.state.colorInterId > 0) {
				clearInterval(this.state.interId);

				this.setState({
					colorInterId: 0
				}, () => {
					let interId = setTimeout(this.colorRotation, 100, colorArr);

					this.setState({
						colorInterId: interId
					})
				})
			} else {
				let interId = setTimeout(this.colorRotation, 100, colorArr);

				this.setState({
					colorInterId: interId
				})
			}


		}
	}

	// Send mood settings to rotateColor
	moodLighting(mood) {
		let moodSetting = [];
		switch (mood) {
			case 'chilled':
				moodSetting = [
					{ color: 'red', duration: 6000 },
					{ color: 'purple', duration: 3000 },
					{ color: 'orange', duration: 5000 }
				];
				break;

			case 'excited':
				moodSetting = [
					{ color: 'yellow', duration: 15000 },
					{ color: 'red', duration: 3000 },
					{ color: 'orange', duration: 5000 }
				];
				break;
			case 'relaxed':
				moodSetting = [
					{ color: 'green', duration: 10000 },
					{ color: 'purple', duration: 3000 },
					{ color: 'teal', duration: 5000 }
				];
				break;

			case 'crazy':
				moodSetting = [
					{ color: 'red', duration: 6000 },
					{ color: 'green', duration: 3000 },
					{ color: 'blue', duration: 5000 },
					{ color: 'orange', duration: 5000 },
					{ color: 'yellow', duration: 5000 },
					{ color: 'teal', duration: 5000 },
					{ color: 'violet', duration: 5000 },
					{ color: 'pink', duration: 5000 },
					{ color: 'white', duration: 5000 },
				];
				break;
			default:
				moodSetting = [
					{ color: 'red', duration: 6000 },
					{ color: 'purple', duration: 3000 },
					{ color: 'orange', duration: 5000 }
				];
				break;
		}
		this.moodRotation(moodSetting)
	}

	// Loop through the entire color spec
	colorLoop() {
		let effectState = 'none';
		if (this.state.effect === 'none') {
			effectState = 'colorloop';
		} else if (this.state.effect === 'colorloop') {
			effectState = 'none';
		}

		this.setState({
			effect: effectState
		}, () => {
			this.loadLighting({ effect: effectState })
		})
	}

	pulseCycle() {

		this.setState({
			pulseInterId: setTimeout(this.pulseCycle, 1000),
			pulseCycle: !this.state.pulseCycle
		}, () => {

			if (this.state.pulseCycle) {
				this.loadLighting({
					"alert": "select"
				});
			} else {
				this.loadLighting({
					"alert": "select"
				});
			}

		})
	}

	colorPulse() {
		if (this.state.on1 || this.state.on2) {
			if (this.state.pulseInterId > 0) {
				clearInterval(this.state.pulseInterId);
				this.setState({
					pulseInterId: 0
				})

			} else {

				let interId = setTimeout(this.pulseCycle, 1000);

				this.setState({
					pulseInterId: interId
				})
			}
		}
	}

	toggleLights(lightCount) {

		if (lightCount === 1 || lightCount === 2) {
			this.setState({
				lightCount: lightCount
			}, () => {
				this.turnLightOff()
			});
		} else {
			this.setState({
				lightCount: 0
			});
		}

	}

	killAllIntervals(){
		clearInterval(this.state.colorInterId);
		clearInterval(this.state.pulseInterId)	

		this.setState({
			on1: false,
			on2: false,
			colorInterId: 0,
			pulseInterId: 0
		})



	}

	render() {
		return (

			<div class='button_container'>
				<h1 id="heading">Brighten Up Your Mood</h1>

				<div className="section-card">
					<span className="font-style">Active Panel</span>
					{this.renderStateButton()}
				</div>
				<Button class="ui button" id="button-red" color={"red"} onClick={() => this.setColor("red", "select")}>Turn
					Red</Button>
				<Button class="ui button" id="button-orange" color={"orange"} onClick={() => this.setColor("orange")}>Turn
					Orange</Button>
				<Button class="ui button" id="button-yellow" color={"yellow"} onClick={() => this.setColor("yellow")}>Turn
					Yellow</Button>
				<Button class="ui button" id="button-green" color={"green"} onClick={() => this.setColor("green")}>Turn Green</Button>
				<Button class="ui button" id="button-olive" color={"olive"} onClick={() => this.setColor("olive")}>Turn Olive</Button>
				<Button class="ui button" id="button-teal" color={"teal"} onClick={() => this.setColor("teal")}>Turn Olive</Button>
				<Button class="ui blue button" id="button-blue" color={"blue"} onClick={() => this.setColor("blue")}>Turn Blue</Button>
				<Button class="ui button" id="button-violet" color={"violet"} onClick={() => this.setColor("violet")}>Turn
					Violet</Button>
				<Button class="ui button" id="button-purple" color={"purple"} onClick={() => this.setColor("purple")}>Turn
					Purple</Button>
				<Button class="ui button" id="button-pink" color={"pink"} onClick={() => this.setColor("pink")}>Turn Pink</Button>
				<Button class="ui button" id="button-white" color={"white"} onClick={() => this.setColor("white")}>Turn White</Button>

				<div class="brightness-slider font-style">
					<span class="title">Color Cycle</span>
					<label>
						<input id="slider-color-cycle" type="range" min="0" max="65495" value={this.state.color} onChange={(e) => {
							this.setColorScale(e.target.value)
						}} />

					</label>
				</div>

				<div class="brightness-slider font-style">
					<span class="title">Brightness</span>
					<label>Min
						<input id="slider-brightness" type="range" min="0" max="254" value={this.state.brightness} onChange={(e) => {
							this.setBrightness(e.target.value)
						}} />
						Max
					</label>
				</div>
				<div class="control-section">
					<span class="font-style">Functions</span>
					<Button class='button' id="button-toggle-on-off" onClick={this.turnLightOff}>
						Toggle On/Off
					</Button>
					<Button class='button' id="button-random-color" onClick={this.randomRotation}>
						Toggle Random
					</Button>
					<Button class='button' id="button-colorloop" onClick={this.colorLoop}>
						Toggle Color Scale
					</Button>
					<Button class='button' id="button-color-pulse" onClick={this.colorPulse}>
						Toggle Pulsing
					</Button>
					<Button class='button' id="button-toggle-light-1" onClick={() => {
						this.toggleLights(1)
					}}>
						Toggle Light 1 on/off
					</Button>
					<Button class='button' id="button-toggle-light-2" onClick={() => {
						this.toggleLights(2)
					}}>
						Toggle Light 2 on/off
					</Button>
					<Button class='button' color={'red'} id="button-toggle-light-2" onClick={this.killAllIntervals}>
						Kill All Loops
					</Button>
				</div>

				<div class='section-card'>
					<span class="title font-style">Choose Your Mood</span>
					<Button class="ui button" id="button-mood-relaxed" color={"teal"}
						onClick={() => this.moodLighting("relaxed")}>Relaxed</Button>
					<Button class="ui button" id="button-mood-chilled" color={"purple"}
						onClick={() => this.moodLighting("chilled")}>Chilled</Button>
					<Button class="ui button" id="button-mood-excited" color={"orange"}
						onClick={() => this.moodLighting("excited")}>Excited</Button>
					<Button class="ui button" id="button-mood-crazy" color={"pink"}
						onClick={() => this.moodLighting("crazy")}>Crazy</Button>
				</div>


				<p>{this.state.username}</p>
			</div>
		)
	}
}

export default App