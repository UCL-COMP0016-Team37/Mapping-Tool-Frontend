import React from 'react';

import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from '../../utils/indexItem';
import {DropdownButton,Dropdown,ButtonToolbar} from 'react-bootstrap';
import getarrayvalue from 'utils/sortUniqueArray';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: [],
            info: 'humanitarian',
            graph: 'doughnut'};
        this.chartRef = React.createRef();
        API.getSearch('test').then((response) => {
            // console.log(response);
            this.setState({ results: response.data });
        });
    }   

    _onClickinfo=(data)=>{
        this.setState({info : data})
        // console.log(data)
    }

    _onClickgraph=(data)=>{
        this.setState({graph : data})
        // console.log(data)
    }

    valueByInfo= (data) => {
        if(this.state.info === 'donors'){
            return data.donors
        }
        else if(this.state.info === 'organization'){
            return data.organization
        }
        else if(this.state.info === 'sector'){
            return data.sector
        }
        else if(this.state.info === 'location'){
            return data.location
        }
        else if(this.state.info === 'status'){
            return data.status
        }
        else{
            return data.humanitarian}
    }

    render() {
        const humanitarian = this.state.results.filter(something => isMatch(this.props.searchTerm, something.projectName)).map(data => this.valueByInfo(data))
        const dataToEvaluate = getarrayvalue(humanitarian);
        const value = dataToEvaluate.map(data => data.value)
        const count = dataToEvaluate.map(data => data.count) 
              
        return( <div className="chart-canvas">
            <ButtonToolbar>
                <DropdownButton id="dropdown-basic-button" title="Type of Graph">
                    {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickgraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Type of Information">
                    {information.map(info => <Dropdown.Item key={info.id} onClick={() => this._onClickinfo(info.id)} >{info.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
            <IndexItem id={this.state.info + '-'+ this.state.graph} type={this.state.graph} title={this.state.info} labels={value} data={count}/>
        </div>)    
    }
}

const typeOfGraph = [
    {name:'line Graph',id:'line'},
    {name:'Bar Chart',id:'bar'},
    {name:'Radar',id:'radar'},
    {name:'Doughnut chart',id:'doughnut'},
    {name:'Pie Chart',id:'pie'},
    {name:'Polar Area',id:'polarArea'},
    {name:'Bubble Graph',id:'bubble'}
]

const information = [
    {name:'Donors',id:'donors'},
    {name:'Organisation',id:'organization'},
    {name:'Sector',id:'sectors'},
    {name:'Location',id:'location'},
    {name:'Status',id:'status'},
    {name:'Humanitarian',id:'humanitarian'}
]