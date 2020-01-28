import React from 'react';

import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';

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
        const returnhumanitarian = [];
        const returnstatus = [];
        const humanitarian = this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName))
       
        var count = 0;
        var stat = 0;
        for(var i = 0; i < humanitarian.length; ++i){
            if(humanitarian[i].status === 'active')
                count++;
            if(humanitarian[i].humanitarian === 'TRUE')
                stat++;
        }
        const humanitarianlabels = ['true','false'];
        const statuslabels = ['active','not active'];
        returnstatus[0] = count;
        returnstatus[1] = humanitarian.length - count;
        returnhumanitarian[0] = stat;
        returnhumanitarian[1] = humanitarian.length - stat;

        return( <div className="chart-canvas">
            <IndexItem id='chart' type='doughnut' title='project status' labels={statuslabels} data={returnstatus}/>
            <IndexItem id='charttwo' type='pie' title='humanitarian' labels={humanitarianlabels} data={returnhumanitarian}/>
        </div>)    
    }
}
