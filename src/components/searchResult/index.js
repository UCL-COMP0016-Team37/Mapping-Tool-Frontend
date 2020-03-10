import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, Container } from 'react-bootstrap';

import API from 'utils/backendApi';
import history from 'utils/history';

import SearchResultItem from './searchResultItem';

// function isMatch(needle, haystack) {
//     return haystack.toLowerCase().includes(needle.toLowerCase());
// }

export default class SearchResult extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            ready: false,
            page : this.props.page,
            totalpage: 1,
            backwardbutton: true,
            forwardbutton: true};
        API.getSearch(this.props.searchTerm,this.props.page).then((response) => {
            this.setState({page: this.props.page});
            console.log(response);
            this.setState({ results: response.data.docs, ready: true });
            this.setState({totalpage: Math.ceil(response.data.numFound/10)});
            if (response.data.numFound > 10){
                this.setState({forwardbutton: false});
            }
        });
    }

    chartView() {
        history.push('/chart/?search='+this.props.searchTerm);
    }

    componentDidUpdate(){
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
        this.setState({backwardbutton: false});
        if (newpage === this.state.totalpage){
            this.setState({forwardbutton : true});
        }
        else this.setState({forwardbutton : false});
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newpage);
    }

    backwardPage(){
        this.setState({ready:false});
        const newpage = parseInt(this.state.page) - 1;
        this.setState({forwardbutton:false});
        if (newpage === 1){
            this.setState({backwardbutton : true});
        }
        else  this.setState({backwardbutton : false});
        history.push('/search-results/?search='+ this.props.searchTerm + '&page='+ newpage);
    }

    render() {
        // console.log(this.state.backwardbutton)
        // console.log(this.state.forwardbutton)
        if (this.state.ready)
            return <Container className="text-left" fluid>
                {/* {console.log(this.state.results)} */}
                Loaded {this.state.results.length} results before filtering.
                {this.state.results.map(
                    results => <SearchResultItem key={results.iati_identifier} data={results.title_narrative[0]} id={results.iati_identifier}/>,
                )}
                <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled={this.state.backwardbutton}>Previous Page</Button> ,
                <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled={this.state.forwardbutton}>Next Page</Button>,
                {/* <Button className='chart-view-button' onClick={this.chartView.bind(this)}>Chart</Button> */}
            </Container>;
        return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

SearchResult.propTypes = {
    searchTerm: PropTypes.string,
    page: PropTypes.string,
};
