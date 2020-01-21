import React from 'react';

import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from './indexItem';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

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
    //     console.log(this.props.searchTerm);
        const returnhumanitarian = []
        const returnstatus = []
        const humanitarian = this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName)).map(data => data.humanitarian)
        const status = this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName)).map(data => data.status)
        var count = 0;
        var stat = 0;
        for(var i = 0; i < status.length; ++i){
            if(status[i] === 'active')
                count++;
            if(humanitarian[i] === 'TRUE')
                stat++;
        }
        const humanitarianlabels = ['true','false'];
        const statuslabels = ['active','not active'];
        returnstatus[0] = count;
        returnstatus[1] = status.length - count;
        returnhumanitarian[0] = stat;
        returnhumanitarian[1] = status.length - stat;

        return( <div className="chart-canvas">
            <IndexItem id='chart' type='doughnut' title='project status' labels={statuslabels} data={returnstatus}/>
            <IndexItem id='charttwo' type='pie' title='humanitarian' labels={humanitarianlabels} data={returnhumanitarian}/>
        </div>)    
    }
}
