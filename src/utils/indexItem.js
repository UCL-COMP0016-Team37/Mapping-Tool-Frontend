import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

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
                    position: 'top',
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

IndexItem.propTypes = {
    id: PropTypes.any,
    type: PropTypes.any,
    title: PropTypes.any,
    labels: PropTypes.any,
    data: PropTypes.any,
};
