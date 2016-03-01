import React, {Component} from "react"


export default class ErrorBox extends Component {
	render = () => {
		if (this.props.errorMessage) {
			return (
					<p className="bg-danger">{this.props.errorMessage}❌❌❌❌❌❌</p>
				)
		}
		else {
			return false
		}
	}
}