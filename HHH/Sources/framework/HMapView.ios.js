/**
 * Created by zhuzihao on 2017/8/4.
 */
import React, { Component, PropTypes } from 'react';

import { requireNativeComponent,View,Image } from 'react-native';

const MapView = requireNativeComponent("HMapView",HMapView)

export default class HMapView extends Component{

    componentDidMount(){

    }
    render(){
        return (
            <MapView  { ...this.props } onUpdate={({nativeEvent})=>{
                console.log(nativeEvent)
            }}></MapView>
        );
    }
}
HMapView.defaultProps={

}
HMapView.propTypes={
    pitchEnabled:React.PropTypes.bool,
    scrollEnabled:React.PropTypes.bool,
    centerCoordinate:React.PropTypes.shape({
        latitude:React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired,
    }),
    onUpdate:React.PropTypes.func
};