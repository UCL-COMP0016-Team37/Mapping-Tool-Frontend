import React from 'react';

import API from 'utils/backendApi';
import IndexItem from '../chart/indexItem';
import getarrayvalue from 'utils/sortUniqueArray'

export default class Top100 extends React.Component{
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
        const donor = this.state.results.map(data => data.organization)
        const toparray = getarrayvalue(donor);
        toparray.sort(function(a, b){return b.count - a.count});
        const value = toparray.map(data => data.value)
        const count = toparray.map(data => data.count)
        console.log(toparray);
        return( <div>
            <IndexItem id='chart' type='horizontalBar' title='Top 100 donor with number of projects' labels={value} data={count}/>
        </div>);    
    }
}