import Spinner from 'react-bootstrap/Spinner';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import ErrorBoundary from 'utils/errorBoundary';
import './map.scss';
import React,{PureComponent} from 'react';
import MapGL,{Popup} from 'react-map-gl';
import Pins from './pins';

//partly referred from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/app.js
export default class Map extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 0,
                longitude: 0,
                zoom: 0,
                bearing: 0,
                pitch: 0,
            },
            results: [],
            popupInfo : null
        };
        API.getMap().then((response)=> {
            this.setState({results: response.data});
        });
    }
   
    _onClickMarker = city => {
        console.log(city)
        this.setState({popupInfo: city});
      };
    
      _renderPopup() {
        const {popupInfo} = this.state;
    
        return (
          popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeOnClick={false}
              onClose={() => this.setState({popupInfo: null})}
            >
              <div>
               {popupInfo.city+ " "+ popupInfo.description}
              </div>
            </Popup>
          )
        );
      }
    
    render() {
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
                        width="100vw"
                        height="100vh"
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        onViewportChange={viewport => this.setState({viewport})}
                        mapboxApiAccessToken={API_KEY}>
                        <Pins data={data} onClick={this._onClickMarker}/>
                        {this._renderPopup()}
                    </MapGL>
                </ErrorBoundary>
            </div>
        );

    }

} 
