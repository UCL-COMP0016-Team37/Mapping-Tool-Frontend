import React from 'react';
import Chart from 'chart.js';

import './chart.scss';

export default class IndexItem extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    
    componentDidUpdate(){
        let ctx = this.props.id;
        new Chart(ctx, {
            // The type of chart we want to create
            type: this.props.type ,

            // The data for our dataset
            data: {
                labels: this.props.labels,
                datasets: [{
                    borderColor : 'grey',
                    data: this.props.data,
                }],
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: this.props.title,
                    position: 'bottom',
                }
            },
        });
    }

    render() {
        return (
            <div>
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        );
    }
}

