import React from 'react';
import API_KEY from '../../../utils/bingMaps';
import ErrorBoundary from 'utils/errorBoundary';
import Spinner from 'react-bootstrap/Spinner';
import MapGL from 'react-map-gl';

export default class HeatMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewport: {
                latitude: 30,
                longitude: 0,
                zoom: 1.25,
                bearing: 0,
                pitch: 0,
            },
            results: [],
        };
    }

    render(){
        return (<div className="map-container">
            <ErrorBoundary>
                <Spinner className="loading" variant="primary" animation="border"/>
                <MapGL
                    {...this.state.viewport}
                    width="100vw"
                    height="90vh"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken={API_KEY}>
                </MapGL>
            </ErrorBoundary>
        </div>);
    }
}
