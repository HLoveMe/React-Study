/**
 * Created by zhuzihao on 2017/7/21.
 */
import {
    StyleSheet,
    Text,
    View,Image,Button,KeyboardAvoidingView,TextInput
} from 'react-native';
import React, { Component } from 'react';
const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
        justifyContent: 'flex-end'
    },
    input:{
        width:100,
        height:44,
        borderWidth:2,
        borderColor:'green',
        backgroundColor:'blue'
    }
});
export default class KeyBoard extends Component{
    static navigationOptions={
        tabBarVisible:false
    }
    componentWillUnmount(){

    }
    render(){
        return (
            <KeyboardAvoidingView style={ [styles.container]} behavior={'height'} keyboardVerticalOffset={ 64 }

            >
                <TextInput placeholder={"输入"} style={ [styles.input] }>

                </TextInput>
            </KeyboardAvoidingView>
        );
    }
}