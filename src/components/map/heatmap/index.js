import React from 'react';
import API_KEY from '../../../utils/bingMaps';
import ErrorBoundary from 'utils/errorBoundary';
import Spinner from 'react-bootstrap/Spinner';
import MapGL,{Source,Layer}  from 'react-map-gl';
import API from 'utils/backendApi';
import Countries from '../../../assets/geojson/country.json';
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
        API.getTopReceiverPerSector(113).then((response) =>{
            const data = response.data.tops.map(data => data.name);
            let results = [];
            for (var i = 0; i < data.length ; i++){
                console.log(data[i]);
                let add = Countries.features.find(elem => elem.properties.ADMIN.toLowerCase() === data[i].toLowerCase());
                if (add !== undefined){
                    console.log(add);
                    results.push(add);
                }
            }
            this.setState({
                results: results,
            });
        });
    }

    render(){
        // console.log(this.state.results)
        // console.log(Countries.features.find(elem => elem.properties.ADMIN.toLowerCase() === 'iraq'));
        const geojson = {
            type: 'FeatureCollection',
            features: this.state.results.map(
                dta=> dta),
        };
        console.log(geojson)
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
                        data={geojson}
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