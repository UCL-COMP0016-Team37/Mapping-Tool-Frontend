import React from 'react';
import API_KEY from '../../../utils/bingMaps';
import ErrorBoundary from 'utils/errorBoundary';
import Spinner from 'react-bootstrap/Spinner';
import MapGL,{Source,Layer}  from 'react-map-gl';
import API from 'utils/backendApi';
import Countries from '../../../assets/geojson/countries.geojson';
import PropTypes from 'prop-types';

export default class HeatMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewport: {
                latitude: 30,
                longitude: 50,
                zoom: 1.15,
                bearing: 0,
                pitch: 0,
            },
            results: [],
        };
        API.getMapPin().then((response) => {
            this.setState({results: response.data});
        });
    }

    render(){
        console.log(this.state.results);
        // const geojson = {
        //     type: 'FeatureCollection',
        //     features: this.state.results.map(
        //         dta=>{
        //             return {
        //                 type: 'Feature',
        //                 geometry: {
        //                     type: 'Point',
        //                     coordinates : [dta.coordinate.longitude,dta.coordinate.latitude],
        //                 },
        //             };
        //         }),
        // };
        return <div className="map-container">
            <ErrorBoundary>
                <Spinner className="loading" variant="primary" animation="border"/>
                <MapGL
                    {...this.state.viewport}
                    width="100%"
                    height="100%"
                    mapStyle={this.props.mapStyle}
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken={API_KEY}>
                    <Source id="my-data"
                        type="geojson"
                        data={Countries}
                    >
                        <Layer {...dataLayer}/>
                    </Source>
                </MapGL>
            </ErrorBoundary>
        </div>;
    }
}

HeatMap.propTypes = {
    mapStyle: PropTypes.string,
};
const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': '#3288bd',
        'fill-opacity': 0.5,
    },
};