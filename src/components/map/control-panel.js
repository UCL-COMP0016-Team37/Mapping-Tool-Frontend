import React from 'react';
import './map.scss';
import PropTypes from 'prop-types';
import {DropdownButton,Dropdown,ButtonToolbar,ButtonGroup,Button} from 'react-bootstrap';
import API from 'utils/backendApi';

export default class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            publisher: [],
        };
        API.getpublisher().then((response)=> {
            this.setState({publisher : response.data.slice(0,10)});
        });
    }

    render() {
        const {handleButtonClickWrapper} = this.props;
        return <div className="control-panel">
            Filter Data Based on Funder/Thematic Areas
            <ButtonToolbar>
                <DropdownButton variant="dark" className="dropdown" id="dropdown-basic" title="Funder Filter">
                    {this.state.publisher.map(publisher => <Dropdown.Item key={publisher.Publisher}>{publisher.Publisher}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton  variant="dark"  className="dropdown" id="dropdown-basic" title="Thematic Areas">
                    {information.map(info => <Dropdown.Item key={info.id}  >{info.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
            <div className="map-buttons-container d-flex justify-content-center">
                <ButtonGroup size="md">
                    <Button variant="dark" onClick={() => handleButtonClickWrapper('pin')}>Points</Button>
                    <Button variant="dark" onClick={() => handleButtonClickWrapper('heat')}>Heatmap</Button>
                    <Button variant="dark" onClick={() => handleButtonClickWrapper('fundingFlow')}>Funding Flow</Button>
                </ButtonGroup>
            </div>
        </div>;
    }
}

const information = [
    {name:'Health',id:'health'},
    {name:'Humanitarian',id:'humanitarian'},
    {name:'Agricultural',id:'agricultural'},
    {name:'Culture',id:'culture'},
    {name:'Energy',id:'energy'},
    {name:'Industrial development',id:'industrialDevelopment'},
];

ControlPanel.propTypes = {
    handleButtonClickWrapper : PropTypes.any,
};