import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, Container } from 'react-bootstrap';

import API from 'utils/backendApi';
import history from 'utils/history';

import SearchResultItem from './searchResultItem';

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            ready: false,
            page : this.props.page,
            totalPage: 1,
            backwardButton: true,
            forwardButton: true,
        };
        API.getSearch(this.props.searchTerm,this.props.page).then((response) => {
            this.setState({ page: this.props.page, results: response.data.docs, ready: true, totalPage: Math.ceil(response.data.numFound/10) });
            if (response.data.numFound > 10){
                this.setState({ forwardButton: false });
            }
        });
    }

    chartView() {
        history.push('/chart/?search='+this.props.searchTerm);
    }

    componentDidUpdate() {
        if (this.props.page !== this.state.page){
            API.getSearch(this.props.searchTerm,this.props.page).then((response) => {
                this.setState({ results: response.data.docs, ready: true, page: this.props.page });
            });
        }
    }

    forwardPage() {
        const newPage = parseInt(this.state.page) + 1;
        this.setState({ backwardButton: false, ready: false, forwardButton: newPage === this.state.totalPage });
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newPage);
    }

    backwardPage() {
        const newPage = parseInt(this.state.page) - 1;
        this.setState({ forwardButton: false, ready: false, backwardButton: newPage === 1 });
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newPage);
    }

    render() {
        if (this.state.ready)
            return <Container className="text-left" fluid>
                Loaded {this.state.results.length} results before filtering.
                {this.state.results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled={this.state.backwardButton}>Previous Page</Button> ,
                <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled={this.state.forwardButton}>Next Page</Button>,
                <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button>
            </Container>;
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
    page: PropTypes.string,
};
