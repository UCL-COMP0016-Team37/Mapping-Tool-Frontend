import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import Spinner from 'react-bootstrap/Spinner';

import mapData from './data/mapData';
import API_KEY from 'utils/bingMaps';
import API from 'utils/backendApi';
import ErrorBoundary from 'utils/errorBoundary';
import './map.scss';

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {results: []};
        API.getMap('test').then((response)=> {
            this.setState({results: response.data})
        });
    }

    callBackMethod() {
        console.log('test');
    }  
  
    render() {  
        const newData = this.state.results.map(
            data => { 
                return {
                location: data.location,
                addHandler: 'mouseover',
                infoboxOption:{ title: data.title, description: data.description },
                pushPinOption:{ title: data.title, description: 'Pushpin' },
                infoboxAddHandler: {'type' : 'click', callback: this.callBackMethod }, 
                pushPinAddHandler: {'type' : 'click', callback: this.callBackMethod }, 
                }
            }
        )   
        console.log(mapData)
        console.log(newData)
        return <div className="map-container">
            <ErrorBoundary>
                <Spinner className="loading" variant="primary" animation="border"/>
                <ReactBingmaps 
                    bingmapKey={API_KEY}
                    center={[0,0]}
                    infoboxesWithPushPins = {newData}
                    zoom={-10}
                />
            </ErrorBoundary>
        </div>;
    }
       
}