import React from 'react';
import PropTypes from 'prop-types';
import MapGL, {Marker} from 'react-map-gl';
import { API_KEY, MAP_STYLE } from 'utils/mapbox';
import ErrorBoundary from 'utils/errorBoundary';
import MapboxGeocoder from 'mapbox-geocoding';

import './marker.scss';


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        console.log(MapboxGeocoder);
        MapboxGeocoder.setAccessToken(API_KEY);

        MapboxGeocoder.geocode('mapbox.places', this.props.place, (err, data) => {
            console.log(data);
            const feature = data.features[0];
            if (feature === undefined) {
                this.setState({ error: true });
                return;
            }
            const center = feature.center;
            this.setState({ longitude: center[0], latitude: center[1], place_longitude: center[0], place_latitude: center[1] });
        });
        this.state = {
            zoom: 3,
            bearing: 0,
            pitch: 0,
            place_latitude: 0,
            place_longitude: 0,
            error: false,
        };
    }

    render() {
        if (this.state.error) {
            return <></>;
        }
        return <ErrorBoundary>
            <MapGL
                {...this.state}
                width="100%"
                height="100%"
                mapStyle={MAP_STYLE}
                mapboxApiAccessToken={API_KEY}
                onViewportChange={viewport => this.setState({...viewport})}
            >
                <Marker latitude={this.state.place_latitude} longitude={this.state.place_longitude}>
                    <div className="marker"></div>
                </Marker>
            </MapGL>
        </ErrorBoundary>;
    }
}

Map.propTypes = {
    place: PropTypes.string,
};