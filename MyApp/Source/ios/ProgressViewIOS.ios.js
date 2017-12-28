/**
 * Created by zhuzihao on 2017/7/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,Modal,ProgressViewIOS
} from 'react-native';

const  styles = StyleSheet.create({
    container:{
        paddingTop:10,
        height:100,
    },
    progress:{
        width:"80%"
    }
})
export default class Progress extends Component{
    render(){
        return (
            <View style={ styles.container }>
                <ProgressViewIOS progressViewStyle={ 'default' } style={ styles.progress } trackTintColor={ 'red' } progress={ 0.5 } progressTintColor= 'yellow'></ProgressViewIOS>
            </View>
        );
    }
}