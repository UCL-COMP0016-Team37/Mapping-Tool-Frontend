import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, Container } from 'react-bootstrap';

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
            return <Container className="text-left" fluid>
                Loaded {this.state.results.length} results before filtering.
                {this.state.results.filter(item => isMatch(this.props.searchTerm, item.projectName)).map(
                    something => <SearchResultItem key={something.interaction_intervention_id} data={something}/>,
                )}
                <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button>
            </Container>;
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
};
