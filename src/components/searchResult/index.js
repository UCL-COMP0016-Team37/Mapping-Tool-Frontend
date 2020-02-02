import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import SearchResultItem from './searchResultItem';
import API from 'utils/backendApi';
import history from 'utils/history';
import { Button, Table } from 'react-bootstrap';
import './searchResult.scss';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {results: []};
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data });
        });
    }

    chartView(){
        history.push('/chart/?search='+this.props.searchTerm);
    }
    
    render() {
        return <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Project Name</th>
                    </tr>
                </thead>
                {this.state.results ?
                    this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName)).map(
                        something => <SearchResultItem key={something.interaction_intervention_id} data={something}/>,
                    ) :
                    <Spinner/>
                }
            </Table>

            <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button>
        </>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
};
