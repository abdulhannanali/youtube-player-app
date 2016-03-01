import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import _ from "lodash"

export default class PlayList extends Component {
	clickPlayList = (index) => {
		return () => {
			this.props.playVideo(index)
		}
	}

	removeVideo = (index) => {
		return (event) => {
			event.preventDefault()
			this.props.removeVideo(index)
		}	
	}

	render = () => {
		if (_.isEmpty(this.props.playlist)) {
			return (<h1>No videos at the moment</h1>)
		}

		var videos = this.props.playlist.map(function (value, index, array) {
				var classNames = []
				classNames.push(index == this.props.current ? "success" : "")
				return (
						<tr className={classNames.join(" ")}
						    key={value} >
							<td onClick={this.clickPlayList(index)}>{value}</td>
							<td>
								<a onClick={this.removeVideo(index)} href="#">Delete</a>
							</td>
						</tr>
					)
		}.bind(this))	


		return (
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Youtube Video Id (also known as id)</th>
							<th>Delete this video</th>
						</tr>
					</thead>
					<tbody>
						{videos}
					</tbody>
				</table>
			)

	}
}