// React and ReactDOM are external dependencies mentioned in
// the index.html file
// 
import React from "react"
import ReactDOM, {render} from "react-dom"
import YoutubeApp from "./components/YoutubeApp.js"

render	(
			<YoutubeApp />, 
			document.getElementById("container")
		)