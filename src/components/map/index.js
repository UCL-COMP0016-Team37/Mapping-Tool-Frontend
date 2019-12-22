import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

import mapData from './data/mapData'
import API_KEY from '../../utils/bingMaps';
import './map.scss';
import API from '../../utils/backendApi';

export default class Map extends React.Component {
    constructor(props){
        super(props)
        this.state = {results: []}
        console.log(API.getMap('test'))
    }
    callBackMethod() {
        console.log('test');
    }    

    render() {
        // let thisisthemap
        // mapData.map(mapDatas=> thisisthemap = { "location" : mapDatas.location, 
        //                                                                     "addHandler": mapDatas.addHandler,
        //                                                                     "infoboxOption"  : mapDatas.infoboxOption,
        //                                                                     "pushPinOption" : mapDatas.pushPinOption,
        //                                                                     "infoboxAddHandler":mapDatas.infoboxAddHandler,
        //                                                                     "pushpinAddHAndler": mapDatas.pushPinAddHandler })
      
        return <div className="map-container">
            <ReactBingmaps 
                bingmapKey={API_KEY}
                // center={[13.0827, 80.2707]}
                zoom={-10}
                infoboxesWithPushPins = {mapData}
            />
            </div>;
    }
}