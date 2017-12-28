/**
 * Created by zhuzihao on 2017/8/2.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from "react-navigation"

class Meet extends Component{
    static navigationOptions={
        title:"Meet"
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'yellow'}}>

            </View>
        );
    }
}

export const MeetNav = StackNavigator({
    meet:{screen:Meet}
},{
    initialRouteName:'meet'
});