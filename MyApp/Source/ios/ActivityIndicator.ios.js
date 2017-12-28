import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,ActivityIndicator
} from 'react-native';


const activity=StyleSheet.create({
    center:{
        // flex:1,
        width:100,
        height:100
    }
})
export default class ActivityIndicatorCom extends  Component{
    _timer=null;
    _indicator=null;

    constructor(option){
        super(option)
        this.state={
            show:true
        }
        this._timer = setTimeout(()=>{
            this.setState({
                show:false
            })
        },2000)
    }
    componentWillUnmount(){
        this._timer & clearTimeout(this._timer);
    }
    render(){
        return (
            <ActivityIndicator color='red' style={ [activity.center,{backgroundColor:'yellow',padding:10}] } hidesWhenStopped={ true } animating={ this.state.show } ref={(self)=>{this._indicator=self}}></ActivityIndicator>
        );
    }
}