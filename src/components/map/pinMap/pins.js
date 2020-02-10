// from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/pins.js

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import PinImage from 'assets/images/white-white.png';
import '../map.scss';

export default class Pins extends PureComponent {


    render() {
        const {data,viewportZoom,onMouseOver,onMouseLeave,onClick} = this.props;
        // console.log(viewportZoom)
        if (viewportZoom < 2){
            const newdata = clusterpins(data);
            // console.log(newdata);
            return newdata.map(data =>
                <Marker key={`marker-${data.index}`} longitude={data.longitude} latitude={data.latitude}>
                    <div className="image-container"
                        onMouseOver={() => onMouseOver(data)}
                        onMouseOut ={() => onMouseLeave()}>
                        <img src={PinImage} alt="pin map pins" width="25" height="25"/>
                        <div className="image-marker">{data.description}</div>
                    </div>
                </Marker>);
        }
        return data.map(data =>
            <Marker key={`marker-${data.city}`} longitude={data.longitude} latitude={data.latitude}>
                <div className="image-container"
                    onMouseOver={() => onMouseOver(data)}
                    onMouseOut ={() => onMouseLeave()}
                    onClick ={() => onClick(data.city)}>
                    <img src={PinImage} alt="pin map pins" width="25" height="25"/>
                    <div className="image-marker">{data.description}</div>
                </div>
            </Marker>,
        );
    }
}

Pins.propTypes = {
    data: PropTypes.any,
    onMouseOver: PropTypes.any,
    onClick: PropTypes.any,
    onMouseLeave: PropTypes.any,
    viewportZoom: PropTypes.number,
};

function clusterpins(original){
    // console.log(original)
    let compressed = [];
    let copy = original.slice(0);

    for (var i = 0; i < copy.length; i++){

        var newlist = [];
        if (copy[i] !== undefined){
            newlist.push(copy[i]);
            for (var j=i+1; j < copy.length; j++){
                if (copy[j] !== undefined){
                    let lat = Math.abs(copy[i].latitude - copy[j].latitude);
                    let long = Math.abs(copy[i].longitude - copy[j].longitude);
                    // console.log(copy[i].latitude - copy[i].latitude);
                    if (lat < 5 && long < 5) {
                        newlist.push(copy[j]);
                        delete copy[j];
                    }
                }
            }
            let k = 0;
            var desc = '';
            var num = 0;
            for (k = 0; k < newlist.length; k++){
                if (k > 0){
                    desc = desc + ' & ' ;
                }
                desc= desc+ newlist[k].city;
                num = num + parseInt(newlist[k].description);
            }
            const result = {
                index : desc,
                description: num.toString(),
                longitude : newlist[0].longitude,
                latitude : newlist[0].latitude,
                city : desc,
            };
            // console.log(result);
            compressed.push(result);
        }
    }
    // console.log(compressed)
    return compressed;
}
