/**
 * Created by zhuzihao on 2017/7/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Button,AlertIOS
} from 'react-native';

export default class AlertIOSVC extends Component{

    render(){
        return (
            <View>
                <Button title={"alert"} onPress={ this.alert}></Button>
                <Button title={"prompt"} onPress={ this.prompt}></Button>

            </View>
        );
    }
    alert=()=>{
        //直接使用prompy 替代
        this.prompt()
    }
    prompt=()=>{
        /**
         * title: ?string,
         message?: ?string,
         callbackOrButtons?: ?((text: string) => void) | ButtonsArray,
         type?: ?AlertType = 'plain-text',
         defaultValue?: string,
         keyboardType?: string
         * */
        AlertIOS.prompt(
            "标题",
            "消息",
            [
                {text: 'Cancel',style:"destructive", onPress: () => {}},
                {text: 'OK', onPress: (message)=> {console.log(message)}},
           ],
            "login-password",
            "ABCD",
            "name-phone-pad"
        )
    }
}