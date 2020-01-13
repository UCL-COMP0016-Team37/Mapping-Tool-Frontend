import React from 'react';

import SearchResultItem from './searchResultItem';
import API from 'utils/backendApi';
import history from 'utils/history';
import { Button, ListGroup } from 'react-bootstrap';
import './searchResult.scss';

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {results: []};
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data });
        });
    }

    chartView(){
        history.push('/chart');
    }

    render(){
        return <>
            <ListGroup>
                {this.state.results.map(
                    something => <SearchResultItem key={something.title} country={something}/>,
                )}
            </ListGroup>

            <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button>
        </>;
    }
}
