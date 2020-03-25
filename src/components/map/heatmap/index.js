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
        API.getHeatMap(this.props.sectorCode).then((response) =>{
            const data = response.data.map(data => {
                return {
                    code: data.code,
                    value: data.value,
                };
            });
            let results = [];
            for (let i = 0; i < data.length ; i++){
                // console.log(data[i]);
                let add = Countries.features.find(elem => elem.properties.ISO_A3.toLowerCase() === data[i].code.toLowerCase());
                if (add !== undefined){
                    const gson = {
                        type: add.type,
                        properties: {
                            ADMIN : add.properties.ADMIN,
                            ISO_A3: add.properties.ISO_A3,
                            value: data[i].value,
                        },
                        geometry: add.geometry,
                    };
                    // console.log(gson)
                    results.push(gson);
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
        // console.log(geojson)
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
    sectorCode: PropTypes.string,
};
const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': {
            property: 'value',
            stops: [
                [100000, '#3288bd'],
                [1000000, '#66c2a5'],
                [10000000, '#abdda4'],
                [100000000, '#e6f598'],
                [1000000000, '#ffffbf'],
                [10000000000, '#fee08b'],
                [100000000000, '#fdae61'],
                [1000000000000, '#f46d43'],
                [10000000000000, '#d53e4f'],
            ],
        },
        'fill-opacity': 0.5,
    },
};