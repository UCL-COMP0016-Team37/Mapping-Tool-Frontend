// from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/pins.js

import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';
import './map.scss'

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {


    render() {
        const {data,onMouseOver,onMouseLeave,onClick} = this.props;
        // console.log(data);
        return data.map(data => (
            <Marker key={`marker-${data.index}`} longitude={data.longitude} latitude={data.latitude}>
                <div className="image-container">
                    <img src={require('../../utils/images/white-white.png')} width="25" height="25" 
                        onMouseOver={() => onMouseOver(data)} 
                        onMouseOut ={() => onMouseLeave()}
                        onClick ={() => onClick(data.city)}/>
                    <div className="image-marker">{data.description}</div>
                </div>
            </Marker>
        ));
    }
}