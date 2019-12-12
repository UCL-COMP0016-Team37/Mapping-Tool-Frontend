import React from 'react';

import './search.scss';
import history from '../../history'

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }
    
    setSearch(e){
        history.push('/search-results/?value='+ this.state.search)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.value]: e.target.value
        })
    }

    onChange(e){
        this.setState({search: e.target.value})
    }

    handleKeyPress=e=>{
        if (e.key === "Enter") {
            this.setSearch(e)
          }
    }
    
    render() {
        return (
            <div className="search">
                <input className="search-bar" placeholder="Search Input Here"value={this.state.name} onChange={this.onChange.bind(this)} onKeyPress={this.handleKeyPress} ></input>
                <button className="search-button" onClick={(e) => this.setSearch(e)}>search</button>
            </div>
        )
    }
}