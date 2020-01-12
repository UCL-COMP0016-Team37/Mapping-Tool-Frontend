import React from 'react';
import Chart from 'chart.js';

import './chart.scss';
import API from 'utils/backendApi';

export default class chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: []};
        this.chartRef = React.createRef();
        API.getSearch('test').then((response) => {
            this.setState({ results: response.data });
        });
    }

    componentDidUpdate(){
        const country = this.state.results.map(country => country);
        // ['Afghanistan','Albania','Algeria','Andorra','Angola','UK']
        let ctx = 'myChart';
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
                labels: country,
                datasets: [{
                    borderColor : 'grey',
                    data: [10, 5, 2, 20, 30, 45],
                }],
            },

            // Configuration options go here
            options: {},
        });
    }

    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        );
    }
}
