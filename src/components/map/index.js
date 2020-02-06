import React from 'react';

import PinMap from './pinMap';
import FundingFlowMap from './fundingFlow';
import { ButtonGroup, Button } from 'react-bootstrap';

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
            'fundingFlow': FundingFlowMap,
        };
        return React.createElement(maps[this.state.active]);
    }

    handleButtonClickWrapper(id) {
        return () => {
            this.setState({ active: id });
        };
    }

    render() {
        return <div className="map-container d-flex flex-column">
            {this.getActiveMap()}
            <div className="map-buttons-container d-flex flex-column">
                <ButtonGroup size="lg">
                    <Button variant="secondary" onClick={this.handleButtonClickWrapper('pin').bind(this)}>Points</Button>
                    <Button variant="secondary" onClick={this.handleButtonClickWrapper('fundingFlow').bind(this)}>Funding Flow</Button>
                </ButtonGroup>
            </div>
        </div>;
    }

}

Map.propTypes = {
};
