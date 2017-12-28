/**
 * Created by zhuzihao on 2017/8/2.
 */
/**
 * Created by zhuzihao on 2017/8/2.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Button
} from 'react-native';
import { StackNavigator } from "react-navigation"
const PubSub = require('pubsub-js');
class News extends Component{
    static navigationOptions={
        title:"News"
    }
    constructor(ops){
        super(ops);

    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'orange'}}>
                <Button onPress={ ()=>{
                    PubSub.publish("OUT",[1,2,3,4])
                }} title={"CLICK"}>

                </Button>
            </View>
        );
    }
}

export const NewsNav = StackNavigator({
    news:{screen:News}
},{
    initialRouteName:'news'
});