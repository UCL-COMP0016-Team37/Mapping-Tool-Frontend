import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import Spinner from 'react-bootstrap/Spinner';

import mapData from './data/mapData';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import ErrorBoundary from 'utils/errorBoundary';
import './map.scss';

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {results: []};
        console.log(API.getMap('test'));
    }

    callBackMethod() {
        console.log('test');
    }    

    render() {      
        return <div className="map-container">
            <ErrorBoundary>
                <Spinner className="loading" variant="primary" animation="border"/>
                <ReactBingmaps 
                    bingmapKey={API_KEY}
                    // center={[13.0827, 80.2707]}
                    zoom={-10}
                    infoboxesWithPushPins = {mapData}
                />
            </ErrorBoundary>
        </div>;
    }
}