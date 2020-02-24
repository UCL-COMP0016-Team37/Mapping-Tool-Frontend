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
        };
    }

    getActiveMap() {
        const maps = {
            'pin': PinMap,
            'heat': HeatMap,
            'fundingFlow': FundingFlowMap,
        };
        return React.createElement(maps[this.state.active]);
    }

    handleButtonClickWrapper(id) {
        return this.setState({ active: id });
    }

    render() {
        return <div className="map-container d-flex flex-column">
            {this.getActiveMap()}
            <ControlPanel handleButtonClickWrapper={this.handleButtonClickWrapper.bind(this)}/>
        </div>;
    }

}

Map.propTypes = {
};
