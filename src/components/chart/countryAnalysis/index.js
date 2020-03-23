import React from 'react';
import PropTypes from 'prop-types';
import '../chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import {DropdownButton,Dropdown,ButtonToolbar} from 'react-bootstrap';

export default class CountryAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'pie',
            graphcolor: ['red','green','blue','yellow','black'],
            value: undefined,
            count: undefined,
            countryCode: props.countryCode,
            ready: false,
            rest: undefined,
            totalSector: undefined,
            number: undefined,
        };
        API.getSectorInCountryAnalysis(props.countryCode).then((response) =>{
            let value = response.data.tops.map(data => data.name.split('-')[0]);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                value: value,
                count: count,
                totalSector: response.data.totalSector,
                rest: response.data.rest,
            });
        });
        API.getSearch(this.props.searchTerm,1).then((response) => {
            this.setState({ number: response.data.numFound,ready:true});
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    render() {
        if (this.state.ready){
            return <div>
                <ButtonToolbar>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Type of Graph">
                        {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                    </DropdownButton>
                </ButtonToolbar>
                <div className="chart-canvas">
                    <IndexItem
                        id={this.state.sectorCode + '-'+ this.state.countryCode}
                        type={this.state.graph}
                        title="Sector analysis for country"
                        labels={this.state.value}
                        data={this.state.count}
                        color={this.state.graphcolor}
                    />
                </div>
                <div className="chart-canvas">
                    {this.state.number} total projects
                </div>
            </div>;}
        else return <div></div>;
    }
}

const typeOfGraph = [
    {name:'line Graph',id:'line'},
    {name:'Bar Chart',id:'bar'},
    {name:'Radar',id:'radar'},
    {name:'Doughnut chart',id:'doughnut'},
    {name:'Pie Chart',id:'pie'},
    {name:'Polar Area',id:'polarArea'},
    {name:'Bubble Graph',id:'bubble'},
];

CountryAnalysis.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};