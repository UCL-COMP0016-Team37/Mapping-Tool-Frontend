import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, Container, ButtonGroup } from 'react-bootstrap';

import API from 'utils/backendApi';
import history from 'utils/history';

import SearchResultItem from './searchResultItem';

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            ready: false,
            totalPage: 1,
            backwardButton: true,
            forwardButton: true,
            zeronumber: true,
        };
        this.requestSearch();
    }

    chartView() {
        history.push('/chart/?search='+this.props.searchTerm);
    }

    componentDidUpdate() {
        this.requestSearch();
    }

    requestSearch() {
        if (this.props.page !== this.state.page || this.props.searchTerm !== this.state.searchTerm) {
            API.getSearch(this.props.searchTerm, this.props.page).then((response) => {
                this.setState({
                    results: response.data.docs,
                    searchTerm: this.props.searchTerm,
                    ready: true,
                    page: this.props.page,
                    totalPage: Math.ceil(response.data.numFound/10),
                    zeronumber: response.data.numFound === 0,
                });
                if (response.data.numFound > 10){
                    this.setState({ forwardButton: false });
                }
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
        if (this.state.ready) {
            const results = this.state.results.filter(el => !el.iati_identifier.includes('/'));
            return <Container className="text-left py-3" fluid>
                <Container fluid className="my-3">
                    <Button className='chart-view-button' onClick={this.chartView.bind(this)} disabled={this.state.zeronumber}>View Analysis</Button>
                    <ButtonGroup className='float-right'>
                        <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled={this.state.backwardButton}>Previous Page</Button>
                        <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled={this.state.forwardButton}>Next Page</Button>
                    </ButtonGroup>
                </Container>
                <div className="text-right">Loaded {results.length} results on this page out of {this.state.totalPage} pages.</div>
                {results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <ButtonGroup className="my-3">
                    <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled={this.state.backwardButton}>Previous Page</Button>
                    <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled={this.state.forwardButton}>Next Page</Button>
                </ButtonGroup>
            </Container>;
        }
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
    page: PropTypes.string,
};
