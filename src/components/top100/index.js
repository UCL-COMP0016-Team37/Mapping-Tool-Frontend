import React from 'react';

import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';
<<<<<<< HEAD
import getArrayValue from 'utils/sortUniqueArray';
=======
import getarrayvalue from 'utils/sortUniqueArray'
import './top100.scss'
>>>>>>> map-gl-version

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
<<<<<<< HEAD
        const donor = this.state.results.map(data => data.organization);
        const topArray = getArrayValue(donor);
        topArray.sort(
            (a, b) => b.count - a.count,
        );
        const value = topArray.map(data => data.value);
        const count = topArray.map(data => data.count);
        console.log(topArray);
        return <div>
=======
        const donor = this.state.results.map(data => data.organization)
        const toparray = getarrayvalue(donor).slice(0,101);
        toparray.sort(function(a, b){return b.count - a.count});
        const value = toparray.map(data => data.value)
        const count = toparray.map(data => data.count)
        console.log(toparray);
        return( <div className="top100-canvas">
>>>>>>> map-gl-version
            <IndexItem id='chart' type='horizontalBar' title='Top 100 donor with number of projects' labels={value} data={count}/>
        </div>;
    }
}