import React, {Component} from "react"
import ReactDOM from "react-dom"
import VideoForm from "./VideoForm.js"
import YoutubePlayer from "./YoutubePlayer.js"
import PlayList from "./PlayList.js"
import url from "wurl"
import store from "store"


export default class YoutubeApp extends Component {
	state = {
		playlist: store.get("playlistVideos") || [],
		current: store.get("current") || 0
	}  
	constructor () {
		super()
	}

	// adds a playlist link in the currently maintained state of the react app
	changeCurrentLink = (link) => {
		var self = this
		if (link) {
			var playlist = this.state.playlist
			var id = this.getYoutubeId(link)
			if (id) {
				playlist.push(id)

				store.set("playlistVideos", playlist)

				this.setState({
					playlist: playlist,
				})

				if (!this.state.current) {
					this.setState({
						current: 0
					})
				}

			}
		}
	}

	getYoutubeId = (link) => {
		var domain = url("domain", link)
		var props = url("?", link)


		if (domain == "youtube.com" && props.v) {
			return props.v
		} else if (domain == "youtu.be" && url(1, link)) {
			return url(1, link)
		}
		else {
			return false
		}
	}

	playNextVideo = () => {
		var current = this.state.current + 1 || 0
		if (current >= this.state.playlist.length) {
			current = 0
		}

		this.setState({
			current: current
		})
		store.set("current", current)

	}

	render = () => {

		return (
			<div className="YoutubeApp">
				<VideoForm	onFormSubmit={this.changeCurrentLink} />
				<YoutubePlayer playlist={this.state.playlist} 
							   current={this.state.current}
							   playNext={this.playNextVideo}/>
				<PlayList playlist={this.state.playlist}
						  current={this.state.current} />
			</div>
		)
	}
}