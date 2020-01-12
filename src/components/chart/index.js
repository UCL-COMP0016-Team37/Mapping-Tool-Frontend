import React from 'react';

import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from './indexItem';

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: []};
        this.chartRef = React.createRef();
        API.getSearch('test').then((response) => {
            console.log(response);
            this.setState({ results: response.data });
        });
    }   
    render() {
        return( <div>
            <IndexItem id='chart' type='doughnut' title='doughnut' labels={this.state.results.map(country => country.title)}/>
            <IndexItem id='charttwo' type='pie' title='pie' labels={this.state.results.map(country => country.title)}/>
            </div>)    
    }
}
