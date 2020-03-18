import React from 'react';
import './map.scss';
import PropTypes from 'prop-types';
import {DropdownButton,Dropdown,ButtonToolbar,ButtonGroup,Button} from 'react-bootstrap';
import {mapStyle} from '../../utils/mapbox';

export default class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            publisher: [],
            value: mapStyle[0],
        };
        // API.getpublisher().then((response)=> {
        //     this.setState({publisher : response.data.slice(0,10)});
        // });
    }

    change(e){
        console.log(e);
    }

    render() {
        const {handleButtonClickWrapper,changeMapStyle} = this.props;
        return <div className="control-panel">
            {/* Filter Data Based on Funder/Thematic Areas */}
            {/* <ButtonToolbar> */}
            {/* <DropdownButton variant="dark" className="dropdown" id="dropdown-basic" title="Funder Filter">
                    {this.state.publisher.map(publisher => <Dropdown.Item key={publisher.Publisher}>{publisher.Publisher}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton  variant="dark"  className="dropdown" id="dropdown-basic" title="Thematic Areas">
                    {information.map(info => <Dropdown.Item key={info.id}  >{info.name}</Dropdown.Item>)}
                </DropdownButton> */}
            {/* </ButtonToolbar> */}
            <ButtonGroup size="md">
                <DropdownButton  variant="dark"  className="dropdown" id="dropdown-basic" title="Map Style"  >
                    {mapStyle.map(info => <Dropdown.Item key={info.id} onSelect={changeMapStyle.bind(this,info.id)} >{info.name}</Dropdown.Item>)}
                </DropdownButton>
                <Button variant="dark" onClick={() => handleButtonClickWrapper('pin')}>Points</Button>
                <Button variant="dark" onClick={() => handleButtonClickWrapper('heat')}>Heatmap</Button>
                {/* <Button variant="dark" onClick={() => handleButtonClickWrapper('fundingFlow')}>Funding Flow</Button> */}
            </ButtonGroup>
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
    changeMapStyle : PropTypes.any,
};

// const mapStyle= [
//     {name:'dark', id:'mapbox://styles/mapbox/dark-v10'},
//     {name:'light', id:'mapbox://styles/mapbox/light-v10'},
//     {name:'street view',id:'mapbox://styles/mapbox/streets-v11'},
//     {name:'outdoor',id:'mapbox://styles/mapbox/outdoors-v11'},
//     {name:'satellite streets',id:'mapbox://styles/mapbox/satellite-streets-v11'},
// ];