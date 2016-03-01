import React, {Component, PropTypes} from "react"
import Youtube from "react-youtube"
import _ from "lodash"
import store from "store"

export default class YoutubePlayer extends Component {
	constructor() {
		super()	
	}	

	shouldComponentUpdate (nextProps, nextState) {

		// if the video is play and autoplay  is changed then the component
		// doesn't need to be rendered
		if (this.state.play && 
			nextState.autoplay != this.state.autoplay) {
			return false
		}
		else {
			return true
		}
	}

	state = {
		autoplay: store.get("autoplay") || 0,
		play: false
	}

	// if the video is played
	onPlay = () => {
		this.setState({
			play: 1
		})	
	}

	onVideoEnd = (event) => {
		this.setState({
			play: 0
		})
		this.props.playNext()
	}

	handleAutoplayClick = (event) => {
		var autoplay = !this.state.autoplay ? 1 : 0
		this.setState({
			autoplay: autoplay
		})

		store.set("autoplay", autoplay)
	}


	render = () => {
		if (!this.props.playlist || _.isEmpty(this.props.playlist)) {
			return false
		}

		var currentId = this.props.playlist[this.props.current]

		var options = {
			playerVars: {
				autoplay: this.state.autoplay
			}
		}

		return (
			<div className="YoutubeVideo">
				<div className="autoplay">
					<p>Autoplay: <button onClick={this.handleAutoplayClick}>{this.state.autoplay ? "OFF": "ON"}</button></p>
				</div>
				<Youtube videoId={currentId}
						 onEnd={this.onVideoEnd}
						 onPlay={this.onPlay}
						 opts={options} />
			</div>
		)
	}
}