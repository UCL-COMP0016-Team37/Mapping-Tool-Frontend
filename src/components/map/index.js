import React from 'react';

import PinMap from './pinMap';
import HeatMap from './heatmap';
import FundingFlowMap from './fundingFlow';
import ControlPanel from './control-panel';
// import { ButtonGroup, Button } from 'react-bootstrap';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'pin',
            mapStyle: 'mapbox://styles/mapbox/dark-v10'
        };
    }

    getActiveMap() {
        const maps = {
            'pin': PinMap,
            'heat': HeatMap,
            'fundingFlow': FundingFlowMap,
        };
        return React.createElement(maps[this.state.active],{mapStyle:this.state.mapStyle});
    }

    handleButtonClickWrapper(id) {
        return this.setState({ active: id });
    }

    changeMapStyle(e){
        return this.setState({ mapStyle: e });
    }

    render() {
        return <div className="map-container d-flex flex-column">
            {this.getActiveMap()}
            <ControlPanel changeMapStyle={this.changeMapStyle.bind(this)} handleButtonClickWrapper={this.handleButtonClickWrapper.bind(this)}/>
        </div>;
    }

}

Map.propTypes = {
};
