import React from 'react';

import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';
import getarrayvalue from 'utils/sortUniqueArray';
import './top100.scss';

export default class Top100 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: []};
        this.chartRef = React.createRef();
        API.getpublisher().then((response) => {
            console.log(response.data);
            this.setState({ results: response.data });
        });
    }

    render() {
        // const donor = this.state.results.map(data => data.organization);
        // const toparray = getarrayvalue(donor).slice(0,100);
        // const arr = this.state.results.sort(function(a, b){ return b.datasetNum - a.datasetNum; });
        // if(this.state.results[0] !== undefined){
        // console.log(this.state.results[0].datasetNum)}
        // const value = toparray.map(data => data.value);
        // const count = toparray.map(data => data.count);
        // const location = this.state.results.map(data => data.location.split('|')[0].split('>')[0]);
        // const loc = getarrayvalue(location);
        // console.log(loc);
        return <div className="top100-canvas">
            {/* <IndexItem id='chart' type='horizontalBar' title='Top 100 donor with number of projects' labels={value} data={count}/> */}
        </div>;
    }
}