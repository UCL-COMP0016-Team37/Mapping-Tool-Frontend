import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import ErrorBoundary from 'utils/errorBoundary';
import './map.scss';
import MapGL,{Popup} from 'react-map-gl';
import Pins from './pins';
import history from 'utils/history';

//partly referred from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/app.js
export default class Map extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: props.searchTerm,
            viewport: {
                latitude: 30,
                longitude: 0,
                zoom: 1.25,
                bearing: 0,
                pitch: 0,
            },
            results: [],
            popupInfo : null,
        };
        API.getMap(this.state.searchTerm).then((response)=> {
            this.setState({results: response.data});
            if(props.pathname === '/location/'){
                this.setState({viewport: {
                    latitude: response.data[0].latitude,
                    longitude: response.data[0].longitude,
                    zoom: 8,
                    bearing: 0,
                    pitch: 0,
                }});
            }
        });
    }

    _onMouseOver(city) {
        this.setState({popupInfo: city});
    }

    _onMouseLeave() {
        this.setState({popupInfo: null});
    }

    _onClick(city) {
        if (this.props.pathname === '/location/'){
            history.push('/search-results/?search='+ city);
        }
        else{
            history.push('/location/?location='+ city);
        }
    }
    _renderPopup() {
        const {popupInfo} = this.state;

        return (
            popupInfo &&
                <Popup
                    tipSize={5}
                    anchor="bottom"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeButton={false}
                >
                    <div>
                        {popupInfo.city + ' | ' + popupInfo.description}
                    </div>
                </Popup>
        );
    }

    render() {
        // console.log(this.props.searchTerm)
        const data = this.state.results.map(
            dta=>{
                return {
                    index: dta.index,
                    longitude : dta.longitude,
                    latitude: dta.latitude,
                    city: dta.title,
                    description: dta.description,
                };
            });

        return (
            <div className="map-container">
                <ErrorBoundary>
                    <Spinner className="loading" variant="primary" animation="border"/>
                    <MapGL
                        {...this.state.viewport}
                        width="100%"
                        height="100%"
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        onViewportChange={viewport => this.setState({viewport})}
                        mapboxApiAccessToken={API_KEY}>
                        <Pins data={data}
                            onMouseOver={this._onMouseOver.bind(this)}
                            onMouseLeave={this._onMouseLeave.bind(this)}
                            onClick={this._onClick.bind(this)}/>
                        {this._renderPopup()}
                    </MapGL>
                </ErrorBoundary>
            </div>
        );

    }

}

Map.propTypes = {
    pathname: PropTypes.string,
    searchTerm: PropTypes.string,
};