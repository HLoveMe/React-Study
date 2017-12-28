/**
 * Created by zhuzihao on 2017/7/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Button,ActionSheetIOS,UIManager
} from 'react-native';
var ReactNative = require('react-native');
export default class ActionSheetIOSDome extends Component{
    static navigationOptions={
        title:'ActionSheetIOS',
        tabBarVisible:false
    }
    render(){
        return (
            <View>
                <Button ref="button" title={"showActionSheet"} onPress={ this.showActionSheet }></Button>
                <Button title={"ShareAction"} onPress={ this.ShareAction }></Button>
                <Button title={"screen"} onPress={ this.share }></Button>
            </View>
        );
    }
    showActionSheet=(e)=>{

        ActionSheetIOS.showActionSheetWithOptions({
            options:[
                "百度",
                "google",
                "CocoaChina",
                "Cancel",
                "Delete"
            ],
            cancelButtonIndex:3,
            destructiveButtonIndex:4,
            title:"访问",
            message:"选择"
        },(messgae)=>{
            console.log(messgae)
        })

    }
    ShareAction=()=>{
        ActionSheetIOS.showShareActionSheetWithOptions({
            // images, videos, PDF files
            url:"https://www.baidu.com",
            message:"分享",
            subject:"朱子豪",
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        },(err)=>{console.log(err,11)},(success,method)=>{console.log(success,method)})
    }
    share=()=>{
        ReactNative.takeSnapshot(this.refs.button).then((url)=>{
            console.log(url)
        })
        return;
        UIManager.__takeSnapshot("window",{}).then((url)=>{
            console.log(url)
        })



    }
}