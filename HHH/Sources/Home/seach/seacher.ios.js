/**
 * Created by zhuzihao on 2017/8/3.
 */
/**
 * Created by zhuzihao on 2017/8/3.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,Button,
    View,Image,TouchableOpacity
} from 'react-native';
import HMapView  from "../../framework/HMapView.ios"

import  {CycleScrollView , Direction,Alignment } from "../../framework/CycleScrollView.ios"



export default class SeachVC extends  Component{
    static navigationOptions= {
        title: "ios-Seach",
        tabBarVisible:false
    }
    constructor(ops){
        super(ops)
        this.state={
            imgs:[
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502439072&di=18c4d61d7e7efac3939f8e659831ec5f&imgtype=jpg&er=1&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3b292df5e0fe99253724507636a85edf8db171ef.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501844354604&di=dbc24701e0d52d713633d0dc897408c3&imgtype=0&src=http%3A%2F%2Fwww.bz55.com%2Fuploads%2Fallimg%2F150415%2F140-150415151153.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501844354601&di=b67934fd7c1a04ab25c6ac3012afc268&imgtype=0&src=http%3A%2F%2Fimgstore.cdn.sogou.com%2Fapp%2Fa%2F100540002%2F411302.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501844354600&di=a53cbce8f8cc8d80c8907e7d81d256c3&imgtype=0&src=http%3A%2F%2Fimg.douxie.com%2Fupload%2Fupload%2F2014%2F09%2F15%2F54169b02a5380.jpg"
            ],
            titles:[
                "AA",
                "BB",
                "CC",
                "DD"
            ]
        }
    }
    componentDidMount(){
//60a6ce39ca8bb08dd71245060eec35c568e51b39
    }
//centerCoordinate={{latitude:40.13,longitude:117.10}}
    render(){
        return(
            <View style={{flex:1}}>
                <HMapView style={ {height:200} }  scrollEnabled={ true } pitchEnabled={ false } name={{latitude:40.13,longitude:117.10}} >

                </HMapView>
                <CycleScrollView imageUrls={ this.state.imgs } style={{height:200}}
                                 titlesGroup={ this.state.titles }
                                 labelStyle={
                                    {
                                         titleLabelTextAlignment:Alignment.Right
                                    }
                                 }
                                 >

                </CycleScrollView>
            </View>

        );
    }
}