import React from 'react';
import PropTypes from 'prop-types';
import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: []};
        this.chartRef = React.createRef();
        API.getSearch(this.props.searchTerm).then((response) => {
            console.log(response);
            this.setState({ results: response.data });
        });
    }   
    render() {
        const returnHumanitarian = [];
        const returnStatus = [];
        const humanitarian = this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName));
       
        var count = 0;
        var stat = 0;
        for(var i = 0; i < humanitarian.length; ++i){
            if(humanitarian[i].status === 'active')
                count++;
            if(humanitarian[i].humanitarian === 'TRUE')
                stat++;
        }
        const humanitarianLabels = ['true','false'];
        const statusLabels = ['active','not active'];
        returnStatus[0] = count;
        returnStatus[1] = humanitarian.length - count;
        returnHumanitarian[0] = stat;
        returnHumanitarian[1] = humanitarian.length - stat;

        return <div className="chart-canvas">
            <IndexItem id='chart' type='doughnut' title='project status' labels={statusLabels} data={returnStatus}/>
            <IndexItem id='chart2' type='pie' title='humanitarian' labels={humanitarianLabels} data={returnHumanitarian}/>
        </div>;
    }
}

Chart.propTypes = {
    searchTerm: PropTypes.string,
};
