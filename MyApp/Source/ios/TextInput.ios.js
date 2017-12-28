/**
 * Created by zhuzihao on 2017/7/25.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,TextInput
} from 'react-native';


const  styles = StyleSheet.create({
    text1:{
        height:100,
        width:200
    }
})
export  default class TextInputV extends Component{

    constructor(ops){
        super(ops)
        this.state={
            text:"我的天"
        }
    }
    render(){
        return (
            <View style={ {backgroundColor:'red',marginTop:0} }>
                <TextInput  placeholder={ '输入内容'}
                            style={ styles.text1 }
                            defaultValue={  "呵呵" }
                            onChangeText={
                                (text)=>{
                                    console.log(text)
                                }
                            }
                            onChange={(a,b)=>{
                                console.log(a,b)
                                //先
                            }}

                >

                </TextInput>
            </View>
        );
    }
}