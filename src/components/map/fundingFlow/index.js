import React from 'react';
import PropTypes from 'prop-types';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';


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

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            hoveredCounty: null,
            data: [],
            // Set default selection to San Francisco
            selectedCounty: null,
            arcs: [],
            INITIAL_VIEW_STATE: {
                latitude: 30,
                longitude: 50,
                zoom: 1.15,
                bearing: 0,
                pitch: 20,
                maxZoom: 25,
            },
        };
        API.getFundingFlow(props.countryCode).then((response) => {
            const data = response.data.funding.map(data => {
                return {
                    source: [parseFloat(data.from.longitude), parseFloat(data.from.latitude)],
                    target: [parseFloat(data.to.longitude),parseFloat(data.to.latitude)],
                    gain: -1,
                    quantile: Math.floor(Math.random() * 7),
                };});

            const geojson = {
                type: 'FeatureCollection',
                features: response.data.funding.map(
                    dta=>{
                        return {
                            type: 'Feature',
                            properties: {
                                name: dta.transaction.organisation_identifier,
                            },
                            geometry: {
                                type: 'Point',
                                coordinates : [dta.from.longitude,dta.from.latitude],
                            },
                        };
                    }),
            };
            this.setState({
                results: data,
                latitude:parseFloat(response.data.funding[0].to.latitude),
                longitude:parseFloat(response.data.funding[0].to.longitude),
                data: geojson});
        });
    }

    _onHoverData({x, y, object}){
        this.setState({x, y, hoveredCounty: object});
    }

    _renderLayers() {
        const {strokeWidth = 2} = this.props;
        const data = this.state.data;
        return [
            new GeoJsonLayer({
                id: 'geojson',
                data,
                stroked: false,
                filled: true,
                getFillColor: [0, 0, 0, 0],
                onHover: this._onHoverData.bind(this),
                onClick: this._onSelectCounty,
                pickable: true,
            }),
            new ArcLayer({
                id: 'arc',
                data: this.state.results,
                getSourcePosition: d => d.source,
                getTargetPosition: d => d.target,
                getSourceColor: d => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
                getTargetColor: d => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
                getWidth: strokeWidth,
            }),
        ];
    }

    _renderTooltip() {
        const {x, y, hoveredCounty} = this.state;
        return (
            hoveredCounty &&
                <div className="tooltip" style={{left: x, top: y}}>
                    shit
                </div>
        );
    }

    render() {
        return <div className="map-container">
            <DeckGL
                layers={this._renderLayers()}
                initialViewState={this.state.INITIAL_VIEW_STATE}
                controller
                width="100%"
                height="100%"
            >
                <StaticMap
                    reuseMaps
                    mapStyle={this.props.mapStyle}
                    preventStyleDiffing={true}
                    mapboxApiAccessToken={API_KEY}
                />
                {this._renderTooltip.bind(this)}
            </DeckGL>
        </div>;
    }
}

Map.propTypes = {
    data: PropTypes.any,
    strokeWidth: PropTypes.any,
    mapStyle: PropTypes.any,
    countryCode: PropTypes.string,
};
