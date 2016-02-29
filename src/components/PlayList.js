import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import _ from "lodash"

export default class PlayList extends Component {
	render () {
		if (_.isEmpty(this.props.playlist)) {
			return (<h1>No videos at the moment</h1>)
		}

		var videos = this.props.playlist.map(function (value, index, array) {
			var videoStyle = {
				color: index == this.props.current ? "green" : "black"
			}
			return (
					<div className="video" style={videoStyle}>id: {value}</div>
				)
		}.bind(this))	

		return (
				<div className="allTheVideosList">
					<h3>Playlist Videos</h3>
					{videos}
				</div>
			)

	}
}