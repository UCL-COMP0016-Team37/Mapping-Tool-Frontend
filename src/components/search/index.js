import React from 'react';

import './search.scss';
import history from '../../history';

export default class Search extends React.Component {
    search() {
        history.push('/search-results');
    }

    render() {
        return (
            <div>
                <input className="search-bar" placeholder="Search Input Here"></input>
                <button className="search-button" onClick={this.search.bind(this)}>search</button>
            </div>
        )
    }
}