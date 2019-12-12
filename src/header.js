import React from 'react'
import history from './history'
class Header extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this)
    }

    goHome(e){
            var x = window.location.href.split("/")[3];
        	console.log(x);
            if (x !== ""){
                history.push('/')
            }
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    
    render(){
        var headerstyle
        if (this.state.hover){
            headerstyle = {color:'#A9A9A9' }
        }
        return<div style={headerstyle} onMouseEnter = {this.toggleHover } onMouseLeave={this.toggleHover} onClick={(e) => this.goHome(e)}><h1>ANCSSC Mapping Tool</h1></div>}      
    
}
export default Header