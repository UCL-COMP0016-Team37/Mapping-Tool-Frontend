import React from 'react';

import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';
import getArrayValue from 'utils/sortUniqueArray';

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
        const donor = this.state.results.map(data => data.organization);
        const topArray = getArrayValue(donor);
        topArray.sort(
            (a, b) => b.count - a.count,
        );
        const value = topArray.map(data => data.value);
        const count = topArray.map(data => data.count);
        console.log(topArray);
        return <div>
            <IndexItem id='chart' type='horizontalBar' title='Top 100 donor with number of projects' labels={value} data={count}/>
        </div>;
    }
}