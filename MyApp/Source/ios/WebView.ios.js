/**
 * Created by zhuzihao on 2017/7/25.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,WebView,TextInput
} from 'react-native';
import { MyButton1 } from "./Button.ios"
const  styles=StyleSheet.create({
    button:{
        width:40,
        height:"100%",
        backgroundColor:'green'
    }
})
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();`;


export default class Web extends Component{

    isLoad = false;
    transmit = null;
    transmit2 =null;
    constructor(ops){
        super(ops);

        this.state={
            invoke:require("./ReactWebViewBridge"),
            canBack:false,
            web:"https://www.baidu.com",
            input:"https://www.baidu.com"
        }
    }
    componentDidMount(){

        this.transmit = this.state.invoke.register("Image",this.refs.web,(data)=>{
            console.log(data);
        });
        this.transmit2 = this.state.invoke.register("TEXT",this.refs.web,(data)=>{
            console.log(data)
        })
    }
    goback=()=>{
        this.transmit.send("指针",(status)=>{
            console.log(status);
        });
        this.transmit.send("呵呵",(status)=>{
            console.log(status);
        });
        this.transmit.send("SB",(status)=>{
            console.log(status);
        });




        this.transmit2.send("Text指针",(status)=>{
            console.log(status);
        });
        this.transmit2.send("Text呵呵",(status)=>{
            console.log(status);
        });
        this.transmit2.send("TextSB",(status)=>{
            console.log(status);
        });
        return;
        if(this.state.canBack){
            this.refs.web.goBack()
        }
    }
    goWeb = ()=>{
        this.setState({web:this.state.input})
    }
    handle=(e)=>{
        console.log(111,e.nativeEvent.data)
    }
    render() {
        return (
            <View style={ {flex:1} }>
                <View style={ {height:44,flexDirection:'row'} }>
                    <MyButton1 style={ styles.button } text="<" onPress={ this.goback }></MyButton1>
                    <TextInput autoCapitalize="none" style={{height:44,paddingVertical:5,flex:1}}
                               value={ this.state.input }
                               onChangeText={(input)=>{
                                   this.setState({input})
                               }}
                    >

                    </TextInput>
                    <MyButton1 style={ styles.button } text="GO" onPress={ this.goWeb }></MyButton1>
                </View>
                <WebView ref='web'
                 style={ {flex:1} }
                         //source={ {uri:this.state.web} }
                         source={ require("./a.html") }
                         injectedJavaScript={ patchPostMessageJsCode }

                         onLoadStart={
                             (e)=>{
                                 this.setState({
                                     input:e.nativeEvent.url,
                                     canBack:e.nativeEvent.canGoBack
                                 })
                             }
                         }
                         onLoadEnd={()=>{
                             //this.webView.injectJavaScript("window.postMessage('hehe')")
                         }}

                         onMessage={ this.state.invoke.handleMessage }
                >

                </WebView>
            </View>
        );
    }
}