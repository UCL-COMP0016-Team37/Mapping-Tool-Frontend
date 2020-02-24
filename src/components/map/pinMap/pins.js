// from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/pins.js

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import PinImage from 'assets/images/white-white.png';
import '../map.scss';

export default class Pins extends PureComponent {


    render() {
        const {data,viewportZoom,onMouseOver,onMouseLeave,onClick} = this.props;
        // console.log(data);
        // console.log(data[0].longitude)
        if (viewportZoom < 2.5){
            const newdata = clusterpins(data);
            // console.log(newdata)
            return newdata.map(data =>
                <Marker key={`marker-${data.code}`} longitude={parseFloat(data.coordinate.longitude)} latitude={parseFloat(data.coordinate.latitude)}>
                    <div className="image-container"
                        onMouseOver={() => onMouseOver(data)}
                        onMouseOut ={() => onMouseLeave()}>
                        <img src={PinImage} alt="pin map pins" width={getSizeofPin(data.activityCount)} height={getSizeofPin(data.activityCount)}/>
                        <div className="image-marker">{data.activityCount}</div>
                    </div>
                </Marker>,
            );
        }
        return data.map(data =>
        { if (!isNaN(data.coordinate.longitude)){
            return <Marker key={`marker-${data.code}`} longitude={parseFloat(data.coordinate.longitude)} latitude={parseFloat(data.coordinate.latitude)}>
                <div className="image-container"
                    onMouseOver={() => onMouseOver(data)}
                    onMouseOut ={() => onMouseLeave()}
                    onClick ={() => onClick(data.code)}>
                    <img src={PinImage} alt="pin map pins" width={getSizeofPin(data.activityCount)} height={getSizeofPin(data.activityCount)}/>
                    <div className="image-marker">{data.activityCount}</div>
                </div>
            </Marker>;}},
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
    console.log(original)
    let compressed = [];
    let copy = original.slice(0);

    for (var i = 0; i < copy.length; i++){

        var newlist = [];
        if (copy[i] !== undefined && copy[i].coordinate.longitude !== undefined){
            newlist.push(copy[i]);
            for (var j=i+1; j < copy.length; j++){
                if (copy[j] !== undefined){
                    let lat = Math.abs(parseFloat(copy[i].coordinate.latitude) - parseFloat(copy[j].coordinate.latitude));
                    let long = Math.abs(parseFloat(copy[i].coordinate.longitude) - parseFloat(copy[j].coordinate.longitude));
                    // console.log(copy[i].latitude - copy[i].latitude);
                    if (lat < 14 && long < 14) {
                        newlist.push(copy[j]);
                        delete copy[j];
                    }
                }
            }
            let k = 0;
            var desc = '';
            var name = '';
            var num = 0;
            for (k = 0; k < newlist.length; k++){
                if (k > 0){
                    desc = desc + ' & ' ;
                    name = name + ' & ' ;
                }
                desc= desc+ newlist[k].code;
                name= name+ newlist[k].countryName;
                num = num + newlist[k].activityCount;
            }
            const result = {
                code : desc,
                activityCount: num,
                coordinate: {
                    longitude : newlist[0].coordinate.longitude,
                    latitude : newlist[0].coordinate.latitude,
                },
                countryName : name,
            };
            // console.log(result);
            compressed.push(result);
        }
    }
    // console.log(compressed)
    return compressed;
}

function getSizeofPin(activityCount){
    if (activityCount >= 1000){
        return '45';
    }
    else if (activityCount >= 100){
        return '30';
    }
    else return '25';
}