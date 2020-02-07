import React from 'react';
import './map.scss';
import {DropdownButton,Dropdown,ButtonToolbar} from 'react-bootstrap';

export default class ControlPanel extends React.Component{
    render() {
        return <div className="control-panel">
            Filter Data Based on Funder/Thematic Areas
            <ButtonToolbar>
                <DropdownButton className="dropdown" id="dropdown-basic" title="Funder Filter">
                    {typeOfGraph.map(graph => <Dropdown.Item key={graph.id}>{graph.name}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton className="dropdown" id="dropdown-basic" title="Thematic Areas">
                    {information.map(info => <Dropdown.Item key={info.id}  >{info.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
        </div>;
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

const information = [
    {name:'Donors',id:'donors'},
    {name:'Organisation',id:'organization'},
    {name:'Sector',id:'sectors'},
    {name:'Location',id:'location'},
    {name:'Status',id:'status'},
    {name:'Humanitarian',id:'humanitarian'},
];