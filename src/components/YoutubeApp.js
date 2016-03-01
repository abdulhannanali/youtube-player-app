import React, {Component} from "react"
import ReactDOM from "react-dom"
import VideoForm from "./VideoForm.js"
import YoutubePlayer from "./YoutubePlayer.js"
import PlayList from "./PlayList.js"
import ErrorBox from "./ErrorBox.js"
import url from "wurl"
import store from "store"


export default class YoutubeApp extends Component {
	state = {
		playlist: store.get("playlistVideos") || [],
		current: store.get("current") || 0,
		errorMessage: ""
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
				if (playlist.find((value) => value == id)) {
					this.setState({
						errorMessage: "This video is already present in the playlist :) "
					})

					setTimeout(() => {
						this.setState({
							errorMessage: ""
						})
					}, 2000)
					return;
				}

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

	playVideo = (index) => {
		this.setState({
			current: index
		})
		store.set("current", index)
	}

	removeVideo = (index) => {
		var playlist = this.state.playlist
		playlist.splice(index, 1)

		this.setState({
			playlist: playlist
		})			
	}

	deleteVideos = () => {
		var playlist = []
		this.setState({
			playlist: playlist
		})
		store.set("playlistVideos", playlist)
		store.set("current", 0)
	}

	render = () => {

		return (
			<div className="YoutubeApp">
				<div className="row">
					<VideoForm	onFormSubmit={this.changeCurrentLink}
								deleteVideos={this.deleteVideos} />
				</div>
				<div className="row">
					<ErrorBox errorMessage={this.state.errorMessage}/>
				</div>
				<div className="row">
					<div className="col-sm-offset-3 col-sm-6">
						<YoutubePlayer playlist={this.state.playlist} 
									   current={this.state.current}
									   playNext={this.playNextVideo}/>
					</div>
				</div>
				<PlayList playlist={this.state.playlist}
						  current={this.state.current}
						  playVideo={this.playVideo}
						  removeVideo={this.removeVideo} />
			</div>
		)
	}
}