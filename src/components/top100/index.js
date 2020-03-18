import React from 'react';

import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';
import './top100.scss';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import history from '../../utils/history';

export default class Top100 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            count: undefined,
            graphColour: [],
            ready:false,
            page: props.searchTerm,
            backwardButton: true,
            forwardButton: false};

        API.getTopHundred().then((response) => {
            const value = response.data.tops.map(data => data.name).slice(0,25);
            const count = response.data.tops.map(data => data.number).slice(0,25);
            console.log(value);
            this.setState({ value: value,count:count,whole: response.data.tops});
        });
    }

    componentDidUpdate(){
        if (!this.state.ready || parseInt(this.state.page) !== parseInt(this.props.searchTerm)){
            if (this.state.graphColour.length === 0){
                var colour = [];
                for (var i = 0; i < this.state.count.length; i++){
                    const newcolor = getRandomColor();
                    colour.push(newcolor);
                }
                this.setState({
                    graphcolour:colour,
                    ready:true,
                });
            }
            if (parseInt(this.state.page) !== parseInt(this.props.searchTerm)){
                const to = 100 * parseInt(this.props.searchTerm) / 4;
                const from = to - 25;
                const newvalue = this.state.whole.map(data => data.name).slice(from,to);
                const newcount = this.state.whole.map(data => data.number).slice(from,to);
                this.setState({
                    value: newvalue,
                    count:newcount,
                    page:this.props.searchTerm,
                    ready:true,
                });
            }

        }
    }

    forwardPage() {
        const newPage = parseInt(this.state.page) + 1;
        this.setState({ backwardButton: false, forwardButton: newPage === 4,ready:false});
        history.push('/top-100/?page='+ newPage);
    }

    backwardPage() {
        const newPage = parseInt(this.state.page) - 1;
        this.setState({ forwardButton: false, backwardButton: newPage === 1,ready:false });
        history.push('/top-100/?page='+ newPage);
    }

    render() {
        return <div className="top100-canvas">
            <IndexItem id='chart' type='horizontalBar' title='Top 100 donor with number of projects' labels={this.state.value} data={this.state.count} color={this.state.graphcolour}/>
            <Button className='paging-button' onClick={this.backwardPage.bind(this)} disabled={this.state.backwardButton}>Previous Page</Button> 
            <Button className='paging-button' onClick={this.forwardPage.bind(this)} disabled={this.state.forwardButton}>Next Page</Button>
        </div>;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Top100.propTypes = {
    searchTerm: PropTypes.string,
};

