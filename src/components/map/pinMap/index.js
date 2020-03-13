import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import ErrorBoundary from 'utils/errorBoundary';
import '../map.scss';
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
                longitude: 50,
                zoom: 1.15,
                bearing: 0,
                pitch: 0,
            },
            results: [],
            popupInfo : null,
            countryName : null,
        };
        API.getMapPin(this.state.searchTerm).then((response)=> {
            if (!Array.isArray(response.data)){
                this.setState({results: [response.data]});
            }
            else{
                this.setState({results: response.data});
            }
            if(props.pathname === '/location/'){
                this.setState({viewport: {
                    latitude: parseFloat(response.data.coordinate.latitude),
                    longitude: parseFloat(response.data.coordinate.longitude),
                    zoom: 8,
                    bearing: 0,
                    pitch: 0,
                }});
            }
        });
        // API.getGeocode().then((response) => console.log(response.data));
    }

    _onMouseOver(city) {
        this.setState({popupInfo: city});
    }

    _onMouseLeave() {
        this.setState({popupInfo: null});
    }

    _onClick(city) {
        if (this.props.pathname === '/location/'){
            history.push('/search-results/?search=recipient_country_code:('+ city+ ')&page=1');
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
                    longitude={parseFloat(popupInfo.coordinate.longitude)}
                    latitude={parseFloat(popupInfo.coordinate.latitude)}
                    closeButton={false}
                >
                    <div>
                        {popupInfo.countryName + ' | ' + popupInfo.activityCount}
                    </div>
                </Popup>
        );
    }

    render() {
        // console.log(this.props.mapStyle);
        return (
            <div className="map-container">
                <ErrorBoundary>
                    <Spinner className="loading" variant="primary" animation="border"/>
                    <MapGL
                        {...this.state.viewport}
                        width="100%"
                        height="100%"
                        mapStyle={this.props.mapStyle}
                        onViewportChange={viewport => this.setState({viewport})}
                        mapboxApiAccessToken={API_KEY}>
                        <Pins data={this.state.results}
                            viewportZoom={this.state.viewport.zoom}
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
    mapStyle: PropTypes.string,
};
