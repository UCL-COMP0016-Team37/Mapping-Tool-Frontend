import React from 'react';
import PropTypes from 'prop-types';
import './chart.scss';
import SectorAnalysis from './sectorAnalysis';
import CountryAnalysis from './countryAnalysis';
import BothAnalysis from './bothAnalysis';
import history from '../../utils/history';
import {Button} from 'react-bootstrap';

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
            analysis = <BothAnalysis countryCode={this.props.countryCode} sectorCode={this.props.sectorCode}/>;
        }
        else if (this.state.country){
            analysis = <CountryAnalysis countryCode={this.props.countryCode}/>;
        }
        else analysis = <SectorAnalysis sectorCode={this.props.sectorCode}/>;
        return <div>
            {analysis}
            <Button
                className='search-result-button'
                onClick={() => this.goToSearchResult()}
            >Project List</Button>
        </div>;
    }
}

Chart.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};