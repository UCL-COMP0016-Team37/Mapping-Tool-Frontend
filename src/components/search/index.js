import React from 'react';

import './search.scss';

export default class Search extends React.Component {
    render() {
        return (
            <div>
                <input className="search-bar" placeholder="Search Input Here"></input>
                <button className="search-button" onClick={this.Search}>search</button>
            </div>
        )
    }
}