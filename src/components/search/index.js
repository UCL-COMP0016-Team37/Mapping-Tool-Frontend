import React from 'react';
import { Redirect } from 'react-router-dom'

import './search.scss';
import SearchResultsPage from '../../pages/searchResults';
import history from '../../history'

export default class Search extends React.Component {
    setSearch(){
        history.push('/search-results')
    }
    
    render() {
        return (
            <div>
                <input className="search-bar" placeholder="Search Input Here"></input>
                <button className="search-button" onClick={this.setSearch}>search</button>
            </div>
        )
    }
}