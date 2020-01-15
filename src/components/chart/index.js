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
        const returnhumanitarian = []
        const returnstatus = []
        const humanitarian = this.state.results.map(data => data.humanitarian)
        const status = this.state.results.map(data => data.status)
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
        returnstatus[0] = stat;
        returnstatus[1] = status.length - stat;
        returnhumanitarian[0] = count;
        returnhumanitarian[1] = status.length - count;

        return( <div>
            <IndexItem id='chart' type='doughnut' title='project status' labels={statuslabels} data={returnstatus}/>
            <IndexItem id='charttwo' type='pie' title='humanitarian' labels={humanitarianlabels} data={returnhumanitarian}/>
        </div>)    
    }
}
