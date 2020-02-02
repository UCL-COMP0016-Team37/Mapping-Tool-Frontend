import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Spinner } from 'react-bootstrap';

import API from 'utils/backendApi';
import history from 'utils/history';

import SearchResultItem from './searchResultItem';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {results: [], ready: false};
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data, ready: true });
        });
    }

    chartView() {
        history.push('/chart/?search='+this.props.searchTerm);
    }
    
    render() {
        if (this.state.ready)
            return <>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Project Name</th>
                        </tr>
                    </thead>
                    {this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName)).map(
                        something => <SearchResultItem key={something.interaction_intervention_id} data={something}/>,
                    )}
                </Table>
                <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button>
            </>;
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
};
