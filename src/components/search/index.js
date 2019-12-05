import React from 'react';
import { Redirect } from 'react-router-dom'

import './search.scss';
import SearchResultsPage from '../../pages/searchResults';
import history from '../../history'

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }
    
    setSearch(e){
        const form = this.state.name
        history.push('/search-results/value='+ this.state.search)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.value]: e.target.value
        })
    }

    onChange(e){
        this.setState({search: e.target.value})
    }

    
    render() {
        return (
            <div>
                <input className="search-bar" placeholder="Search Input Here"value={this.state.name} onChange={this.onChange.bind(this)} ></input>
                <button className="search-button" onClick={(e) => this.setSearch(e)}>search</button>
            </div>
        )
    }
}