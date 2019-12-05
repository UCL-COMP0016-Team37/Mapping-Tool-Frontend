import React from 'react'
import history from './history'
class Header extends React.Component{
    goHome(e){
        history.push('/')
    }
    render(){
        return<div onClick={(e) => this.goHome(e)}><h1>ANCSSC Mapping Tool</h1></div>}      
    
}
export default Header