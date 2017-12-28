/**
 * Created by zhuzihao on 2017/7/31.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,TextInput,
    View,Image,Button,LayoutAnimation,TouchableHighlight,Settings,Platform
} from 'react-native';
class LeftButton extends Component{
    constructor(ops){
        super(ops)
    }
    render(){
        return (
            <TouchableHighlight onPress={ this.props.onPress }>
                <View {...this.props} style={ [this.props.style] }>
                    <Text {...this.props} style={{flex:1,textAlign:'center',lineHeight:this.props.style.height}}></Text>
                </View>
            </TouchableHighlight>
        );
    }
}

var self;
export default class  LayoutAnimationV extends Component{
    static navigationOptions = {
        tabBarVisible:false,
        headerTitle:"LayoutAnimation",
        headerRight: <LeftButton style={{width:44,height:35,marginRight:10}} onPress={ ()=>{self.beginA()} }>开启</LeftButton>
    }
    constructor(ops){
        super(ops);
        self = this;
        this.state={
            left:1,
            center:1,
            right:1
        }

    }

    beginA =()=>{
        LayoutAnimation.easeInEaseOut()

        return;
        LayoutAnimation.configureNext({
            duration: 800,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
            },

        })
    };
    componentDidMount(){

    }
    render(){
        return (
            <View>
                <View style={{flexDirection:'row'}} >
                    <View style={{flex:1}}>
                        <Text style={{height:35,textAlign:"center",lineHeight:35}} onPress={()=>{
                            this.beginA();
                            this.setState({
                                left:1,
                                center:1,
                                right:1
                            })
                        }}>1:1:1</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{height:35,textAlign:"center",lineHeight:35}} onPress={()=>{
                            this.beginA();
                            this.setState({
                                left:1,
                                center:1,
                                right:2
                            })
                        }}>1:1:2</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{height:35,textAlign:"center",lineHeight:35}} onPress={()=>{
                            this.beginA();
                            this.setState({
                                left:1,
                                center:2,
                                right:3
                            })
                        }}>1:2:3</Text>
                    </View>
                </View>
                <View style={{height:35,flexDirection:'row'}}>
                    <View style={{height:35,backgroundColor:'red',flex:this.state.left}}></View>
                    <View style={{height:35,backgroundColor:'yellow',flex:this.state.center}}></View>
                    <View style={{backgroundColor:'orange',flex:this.state.right}}></View>
                </View>
                <Button onPress={()=>{
                    fetch("https://www.baidu.com",{
                        method:'get'
                    }).then((response)=>{
                        return response.text();
                    }).then((text)=>{
                        console.log(text)
                    }).catch((err)=>{
                        console.log(err);
                    })
                }} title={"Fetch"}></Button>
            </View>
        );
    }
}