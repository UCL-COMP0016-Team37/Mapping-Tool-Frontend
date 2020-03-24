import React from 'react';
import PropTypes from 'prop-types';
import SectorAnalysis from './sectorAnalysis';
import CountryAnalysis from './countryAnalysis';
import BothAnalysis from './bothAnalysis';
import history from 'utils/history';
import { Button, Container } from 'react-bootstrap';

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: props.searchTerm,
            sector: props.sectorCode !== '',
            country: props.countryCode !== '',
            both: props.countryCode !== '' && props.sectorCode !== '',
        };
        this.chartRef = React.createRef();
    }

    componentDidUpdate(){
        if (this.props.searchTerm !== this.state.search){
            this.setState({
                search: this.props.searchTerm,
                sector: this.props.sectorCode !== '',
                country: this.props.countryCode !== '',
                both: this.props.countryCode !== '' && this.props.sectorCode !== '',
            });
        }
    }

    goToSearchResult(){
        history.push('/search-results/?search='+ this.props.searchTerm + '&page=1');
    }

    render() {
        let analysis;
        if (this.state.both){
            analysis = <BothAnalysis searchTerm={this.props.searchTerm} countryCode={this.props.countryCode} sectorCode={this.props.sectorCode}/>;
        }
        else if (this.state.country){
            analysis = <CountryAnalysis searchTerm={this.props.searchTerm} countryCode={this.props.countryCode}/>;
        }
        else analysis = <SectorAnalysis searchTerm={this.props.searchTerm} sectorCode={this.props.sectorCode}/>;
        return <Container fluid className='text-left'>
            <Button
                className='search-result-button my-3'
                onClick={this.goToSearchResult.bind(this)}
            >Back to Search Results</Button>
            {analysis}
        </Container>;
    }
}

Chart.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};