import React from 'react';
import API_KEY from '../../../utils/bingMaps';
import ErrorBoundary from 'utils/errorBoundary';
import Spinner from 'react-bootstrap/Spinner';
import MapGL,{Source,Layer}  from 'react-map-gl';
import API from 'utils/backendApi';
import ControlPanel from '../control-panel';
export default class HeatMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewport: {
                latitude: 30,
                longitude: 50,
                zoom: 1.25,
                bearing: 0,
                pitch: 0,
            },
            results: [],
        };
        API.getMap().then((response) => {
            this.setState({results: response.data});
        });
    }

    render(){
        const geojson = {
            type: 'FeatureCollection',
            features: this.state.results.map(
                dta=>{
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates : [dta.longitude,dta.latitude],
                        },
                    };
                }),
        };
        return <div className="map-container">
            <ErrorBoundary>
                <Spinner className="loading" variant="primary" animation="border"/>
                <MapGL
                    {...this.state.viewport}
                    width="100vw"
                    height="90vh"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken={API_KEY}>
                    <Source id="my-data"
                        type="geojson"
                        data={geojson}
                    >
                        <Layer
                            id="point"
                            type="heatmap"
                        />
                    </Source>
                    <ControlPanel/>
                </MapGL>
            </ErrorBoundary>
        </div>;
    }
}
