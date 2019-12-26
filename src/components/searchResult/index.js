import React from 'react';

import SearchResultItem from './searchResultItem';
import API from 'utils/backendApi';

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {results: []};
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data });
        });
    }

    render(){
        return this.state.results.map(something => <SearchResultItem key={something.title} country={something}/>);
    }
}