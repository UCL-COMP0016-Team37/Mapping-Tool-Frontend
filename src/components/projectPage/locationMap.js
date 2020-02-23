import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import { API_KEY, MAP_STYLE } from 'utils/mapbox';
import ErrorBoundary from 'utils/errorBoundary';
import MapboxGeocoder from 'mapbox-geocoding';


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        console.log(MapboxGeocoder);
        MapboxGeocoder.setAccessToken(API_KEY);

        MapboxGeocoder.geocode('mapbox.places', this.props.place, (err, data) => {
            console.log(data);
            const center = data.features[0].center;
            this.setState({ longitude: center[0], latitude: center[1] });
        });
        this.state = {
            zoom: 3,
            bearing: 0,
            pitch: 0,
        };
    }

    render() {
        return <ErrorBoundary>
            <MapGL
                {...this.state}
                width="100%"
                height="100%"
                mapStyle={MAP_STYLE}
                mapboxApiAccessToken={API_KEY}
                onViewportChange={viewport => this.setState({...viewport})}
            />
        </ErrorBoundary>;
    }
}

Map.propTypes = {
    place: PropTypes.string,
};