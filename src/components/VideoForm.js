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
	}

	render =  () => {
		return (
				<form onSubmit={this.handleLinkSubmit}>
					<input type="text" value={this.state.link} onChange={this.handleLinkChange} />
					<input type="submit" value="Add this video" />
				</form>
			)
	}
}