import React from 'react'
import SearchResultItem from './searchresultitem'

import API from '../../utils/backendApi';

class searchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {results: []};
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data });
        });
    }

    render(){
        
            return this.state.results.map(
                something => <SearchResultItem key={something.title} country={something}/>
            );
    }
}
export default searchResult