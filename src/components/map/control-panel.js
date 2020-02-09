import React from 'react';
import './map.scss';
import PropTypes from 'prop-types';
import {DropdownButton,Dropdown,ButtonToolbar,ButtonGroup,Button} from 'react-bootstrap';

export default class ControlPanel extends React.Component{
    render() {
        const {handleButtonClickWrapper} = this.props;
        return <div className="control-panel">
            Filter Data Based on Funder/Thematic Areas
            <ButtonToolbar>
                <DropdownButton variant="outline-danger" className="dropdown" id="dropdown-basic" title="Funder Filter">
                    {typeOfGraph.map(graph => <Dropdown.Item key={graph.id}>{graph.name}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton  variant="outline-danger"  className="dropdown" id="dropdown-basic" title="Thematic Areas">
                    {information.map(info => <Dropdown.Item key={info.id}  >{info.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
            <div className="map-buttons-container d-flex justify-content-center">
                <ButtonGroup size="md">
                    <Button variant="outline-danger" onClick={() => handleButtonClickWrapper('pin')}>Points</Button>
                    <Button variant="outline-danger" onClick={() => handleButtonClickWrapper('heat')}>Heatmap</Button>
                    <Button variant="outline-danger" onClick={() => handleButtonClickWrapper('fundingFlow')}>Funding Flow</Button>
                </ButtonGroup>
            </div>
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

ControlPanel.propTypes = {
    handleButtonClickWrapper : PropTypes.any,
};