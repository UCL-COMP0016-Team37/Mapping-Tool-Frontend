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
        this.state = {
            results: [],
            ready: false,
            page : this.props.page,
            totalpage: 1,};
        API.getSearch(this.props.searchTerm,this.props.page).then((response) => {
            this.setState({page: this.props.page});
            console.log(response);
            this.setState({ results: response.data.docs, ready: true });
            const numFound = response.data.numFound;
            this.setState({totalpage: Math.ceil(numFound/10)})
        });
    }

    chartView() {
        history.push('/chart/?search='+this.props.searchTerm);
    }

    componentDidUpdate(){
        // console.log(this.props.page !== this.state.page)
        if (this.props.page !== this.state.page){
            API.getSearch(this.props.searchTerm,this.props.page).then((response) => {
                this.setState({page: this.props.page});
                this.setState({ results: response.data.docs, ready: true });
            });}
    }

    forwardPage(){
        // console.log(this.props.page);
        this.setState({ready:false});
        const newpage = parseInt(this.state.page) + 1;
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newpage);
    }

    backwardPage(){
        this.setState({ready:false});
        const newpage = parseInt(this.state.page) - 1;
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newpage);
    }

    render() {
        console.log(this.state.totalpage)
        if (this.state.ready && this.state.page === '1')
            return <Container className="text-left" fluid>
                {console.log(this.state.results)}
                Loaded {this.state.results.length} results before filtering.
                {this.state.results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled>Previous Page</Button> ,
                <Button className='paging-button' onClick={this.forwardPage.bind(this)}>Next Page</Button>,
                {/* <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button> */}
            </Container>;
        else if (this.state.ready && this.state.page === this.state.totalpage)
            return <Container className="text-left" fluid>
                {console.log(this.state.results)}
                Loaded {this.state.results.length} results before filtering.
                {this.state.results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <Button className='paging-button' onClick={this.backwardPage.bind(this)} >Previous Page</Button> ,
                <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled>Next Page</Button>,
                {/* <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button> */}
            </Container>;
        else if (this.state.ready)
            return <Container className="text-left" fluid>
            Loaded {this.state.results.length} results before filtering.
                {this.state.results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <Button className='paging-button' onClick={this.backwardPage.bind(this)} >Previous Page</Button>,
                <Button className='paging-button' onClick={this.forwardPage.bind(this)}>Next Page</Button> ,
                {/* <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button> */}
            </Container>;
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
    page: PropTypes.string,
};
