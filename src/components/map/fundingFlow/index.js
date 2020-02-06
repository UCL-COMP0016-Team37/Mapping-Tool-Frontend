import React from 'react';
import PropTypes from 'prop-types';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import API_KEY from 'utils/bingMaps';


const INITIAL_VIEW_STATE = {
    longitude: 3,
    latitude: 0,
    zoom: 1.25,
    maxZoom: 15,
    pitch: 0,
    bearing: 0,
};

const inFlowColors = [
    [255, 255, 204],
    [199, 233, 180],
    [127, 205, 187],
    [65, 182, 196],
    [29, 145, 192],
    [34, 94, 168],
    [12, 44, 132],
];

const outFlowColors = [
    [255, 255, 178],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [177, 0, 38],
];

const sampleArcs = Array(100).fill().map(() => ({
    source: [Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
    target: [Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
    gain: -1,
    quantile: Math.floor(Math.random() * 7),
}));

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredCounty: null,
            // Set default selection to San Francisco
            selectedCounty: null,
            arcs: sampleArcs,
        };
    }

    _renderLayers() {
        const {data, strokeWidth = 2} = this.props;

        return [
            new GeoJsonLayer({
                id: 'geojson',
                data,
                stroked: false,
                filled: true,
                getFillColor: [0, 0, 0, 0],
                onHover: this._onHoverCounty,
                onClick: this._onSelectCounty,
                pickable: true,
            }),
            new ArcLayer({
                id: 'arc',
                data: this.state.arcs,
                getSourcePosition: d => d.source,
                getTargetPosition: d => d.target,
                getSourceColor: d => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
                getTargetColor: d => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
                getWidth: strokeWidth,
            }),
        ];
    }
    render() {
        const mapStyle = 'mapbox://styles/mapbox/dark-v9';
        return <div className="map-container">
            <DeckGL
                layers={this._renderLayers()}
                initialViewState={INITIAL_VIEW_STATE}
                controller
                width="100vw"
                height="90vh"
            >
                <StaticMap
                    reuseMaps
                    mapStyle={mapStyle}
                    preventStyleDiffing={true}
                    mapboxApiAccessToken={API_KEY}
                />
            </DeckGL>
        </div>;
    }
}

Map.propTypes = {
    data: PropTypes.any,
    strokeWidth: PropTypes.any,
    mapStyle: PropTypes.any,
};
