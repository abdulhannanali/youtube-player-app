import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class VideoForm extends Component {
	state = {
		link: ""
	}

	handleLinkChange = (event) => {
		this.setState({
			link: event.target.value	
		})
	}

	handleLinkSubmit = (event) => {
		event.preventDefault()
		this.props.onFormSubmit(this.state.link)
		this.setState({
			link: ""
		})
	}

	deleteVideos = (event) => {
		this.props.deleteVideos()
	}

	render =  () => {
		return (
				<form onSubmit={this.handleLinkSubmit}>
					<div className="form-group">
						<label className="sr-only" htmlFor="youtubeLink">Youtube Link</label>
						<input 	type="text" 
								className="form-control"
								value={this.state.link} 
								onChange={this.handleLinkChange}
								id="youtubeLink" />

					</div>
					<button type="submit"
							className="btn btn-default">Add this Video</button>
					<button className="btn btn-default"
							onClick={this.deleteVideos}>Delete all Videos</button>
				</form>
			)
	}
}