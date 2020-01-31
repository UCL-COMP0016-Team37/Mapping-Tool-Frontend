import Spinner from 'react-bootstrap/Spinner';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import React from 'react';
import MapGL, {Source, Layer,Popup} from 'react-map-gl';
import './map.scss'

import ErrorBoundary from 'utils/errorBoundary';

import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../map/layers';

//example derived from https://github.com/uber/react-map-gl/blob/5.2-release/examples/clusters/src/app.js
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 40.67,
                longitude: -103.59,
                zoom: 3,
                bearing: 0,
                pitch: 0
            },
            results: [],
            popupInfo : null
    };
    API.getMap().then((response)=> {
    this.setState({results: response.data});
    });
}

getclick(mapboxSource,clusterId){

}

  _sourceRef = React.createRef();

  _onViewportChange = viewport => this.setState({viewport});

  _onClick = city => {    
    if(city.features[0] !== undefined){
        
        const clusterId = city.features[0].properties.cluster_id;

        const mapboxSource = this._sourceRef.current.getSource();

       
        mapboxSource.getClusterLeaves(clusterId, 100000,0, (err, features)=>{
            if (err)
            {
                return;
            }
            var ns = []
            for (let i = 0; i < features.length; i++){
                const j= this.state.results.filter(data => features[i].geometry.coordinates[0] === data.longitude &&  features[i].geometry.coordinates[1] === data.latitude)
                ns.push(j[0])
                // console.log(j)
            }
            this.setState({popupInfo : ns})
            // console.log(ns) 
        })
            
        
    }
    else{
        const whole = city.lngLat.map(num => splitNumber(num));
        const nse = this.state.results.filter(data => ((splitNumber(data.longitude) - whole[0] <= 4 && splitNumber(data.longitude) - whole[0] >= 0) ||
                                                      (splitNumber(data.longitude) - whole[0] >= -4 && splitNumber(data.longitude) - whole[0] <= 0)) && 
                                                      ((splitNumber(data.latitude) - whole[1] <= 4 && splitNumber(data.latitude) - whole[1] >= 0) ||
                                                      (splitNumber(data.latitude) - whole[1] >= -4 && splitNumber(data.latitude) - whole[1] <= 0)))
        console.log(nse);
        if (nse.length !== 0){
        this.setState({popupInfo : nse});
        }
    }
    

 
};

_renderPopup() {
  const {popupInfo} = this.state;
  
  if (popupInfo !== null){
    // console.log(popupInfo)
  return (
    popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo[0].longitude}
        latitude={popupInfo[0].latitude}
        closeOnClick={false}
        onClose={() => this.setState({popupInfo: null})}
      >
        {popupInfo.map(value =><div key={value.title} > 
         {  value.title+ " | "+ value.description}
        </div>)}
      </Popup>
    )
  );}
};

  render() {
    // const {viewport} = this.state;
    const inside =  this.state.results.map(
        dta=>{
            return{
                type: 'Feature', 
                geometry: {type: 'Point', coordinates: [dta.longitude,dta.latitude]}}
            });
    const geojson = {
        type: 'FeatureCollection',
        features: 
           inside
        
    };

    // console.log(geojson)
    return (
        <div className="map-container">
                <ErrorBoundary>
                    <Spinner className="loading" variant="primary" animation="border"/>
                        <MapGL
                            {...this.state.viewport}
                            width="100%"
                            height="100%"
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            onViewportChange={this._onViewportChange}
                            mapboxApiAccessToken={API_KEY}
                            interactiveLayerIds={[clusterLayer.id]}
                            onClick={this._onClick}
                        >
                            <Source
                            type="geojson"
                            data={geojson}//"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"//
                            cluster={true}
                            clusterMaxZoom={14}
                            clusterRadius={50}
                            ref={this._sourceRef}
                            >
                                
                            <Layer {...clusterLayer} />
                            <Layer {...clusterCountLayer} />
                            <Layer {...unclusteredPointLayer} />
                            </Source>
                            {this._renderPopup()}
                        </MapGL>
                    </ErrorBoundary>
            </div>
    );
  }
}

function splitNumber(number){
    var result = parseInt(number.toString().split(".")[0])
    return result;
}