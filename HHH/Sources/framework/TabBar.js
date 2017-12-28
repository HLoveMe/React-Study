/**
 * Created by zhuzihao on 2017/8/8.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,Image,
    View,StackNavigator,TouchableOpacity,findNodeHandle,Animated,Dimensions
} from 'react-native';

import { UIManager} from 'NativeModules'
class TabBarItem extends  Component{

    constructor(ops){
        super(ops);
        this.state={
            select:ops.select
        };
    }
    componentWillReceiveProps({select}){
        this.setState({select})
        this.refs.item.forceUpdate()
    }
    render(){
        return (
            <TouchableOpacity ref="item" activeOpacity={1} style={{flex:1}} onPress={ (e)=>{
                this.props.onPress(e,this.props.title,this);
            } }>
                <View style={{height:35,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width:26,height:26}} source={ this.props.icon }></Image>
                </View>
                <Text style={{height:12,fontSize:10,textAlign:'center',backgroundColor:'rgba(0,0,0,0)',color:this.state.select?"red":'black'}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
const order = ["homeMain","meetMain","newsMain","settingMain"]
export  default  class  TabBarContainer extends  Component{
    titles = ["Home","Meet","News","Setting"];

    images = [require("../../images/toolbar/tabbar_home.png"),require("../../images/toolbar/tabbar_meeting.png"),
        require("../../images/toolbar/tabbar_news.png"),require("../../images/toolbar/tabbar_personal.png")]
    constructor(ops){
        super(ops);
        this.state={
            current:"Home",
            opsitionX:new Animated.Value(0)
        }

    }
    onPress=(e,current,clickitem)=>{
        this.setState({current});
        var index = this.titles.indexOf(current);
        //得到该组件 tag
        const  handle = findNodeHandle(clickitem);
        // 位置
        UIManager.measure(handle,(x)=>{
            Animated.timing(this.state.opsitionX,{
                toValue:x,
                duration:300
            }).start();
        });
        this.props.navigation.navigate(order[index]);
    };
    _renderItems=()=>{
        var titles = this.titles;
        var items =[]
        for(var i =0;i<4;i++){
            items.push((<TabBarItem ref={"item"+`${i}`} key={ `${titles[i]}` } icon={ this.images[i] }  title={`${titles[i]}`} onPress={ this.onPress } select={ this.state.current==`${titles[i]}` }></TabBarItem>))
        }
        return items;
    }
    componentDidMount(){
        console.log(this.props.navigation.state)
    }

    render(){
        return(
            <View ref="container" style={{backgroundColor:"#262E3A",height:49,flexDirection:'row'}}>
                <Animated.View ref="indicate" style={{height:49,width:Dimensions.get("screen").width/4,position:'absolute',zIndex:0,backgroundColor:'#0C4C82',left:this.state.opsitionX}}></Animated.View>
                {
                    this._renderItems()
                }
            </View>
        );
    }
}