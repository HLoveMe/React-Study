import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,PanResponder,TouchableHighlight,TouchableOpacity
} from 'react-native';


export default class ResponderC extends Component{
    static  navigationOptions = {
        headerTitle:"手势",
        tabBarVisible:false
    };
    _panResponder = null;
    _style=null;
    top=10;
    left=10;
    view=null;
    constructor(props){
        super(props)
        this.state = {
            _marginTop:this.top,
            _marginLeft:this.left
        }
    }
    componentWillMount(){

        this._panResponder = PanResponder.create({
            //捕获阶段
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            //冒泡阶段
            // onStartShouldSetResponderCapture:(event,gestureState)=>true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                console.log("top:begin")
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log(gestureState);
                this.setState({
                    _marginTop:this.top+gestureState.dy,
                    _marginLeft:this.left+gestureState.dx
                });
                //必须指定正确的对象
                // this.view.setNativeProps({
                //     style:{
                //         marginTop:this.top+gestureState.dy,
                //         marginLeft:this.left+gestureState.dx
                //     }
                // })
            },
            onPanResponderRelease:(evt,gestureState)=>{
                this.top=this.state._marginTop;
                this.left = this.state._marginLeft
            }
            /**
             *  父组件 在捕获阶段就 让自己成为响应者
             *  子组件 是在冒泡阶段才让自己成为响应者
             *  所以父组件成为响应者
             *
             * */
        })
    }
    render(){
        return (
            <View style={ {width:'100%',height:500,backgroundColor:"red",overflow:"hidden",borderRadius:10,borderWidth:10,borderColor:'white'} }>
                <View {...this._panResponder.panHandlers}  ref = { (view)=>{this.view=view} } style={ [{ backgroundColor:'red',width:200,height:200,justifyContent:'center',alignItems:'center' },{marginTop:this.state._marginTop,marginLeft:this.state._marginLeft}] }  >
                    <TestView></TestView>
                </View>

                <ResponsederCom style={ {marginLeft:100,marginTop:50,width:200,height:120} }></ResponsederCom>

            </View>
        );
    }
}

class TestView extends Component {
    _panResponder = null;
    componentWillMount(){
        this._panResponder = PanResponder.create({
            //冒泡阶段
            onStartShouldSetResponderCapture:(event,gestureState)=>true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                console.log("sub:begin")
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log("sub:move")
            },
        })
    }
    render(){

        return (
            <View style={{backgroundColor:'yellow',width:60,height:60}}></View>
        );
    }
}

//响应系列组件
//TouchableHighlight与Touchable系列组件
class ResponsederCom extends Component{
    constructor(option){
        super(option);
        this.state = {
            opacity:0.5
        }
    }

    render(){
        return (
            <TouchableHighlight onPress={ ()=>{this.setState({opacity:1})}} {...this.props} >
                <Image source={ require("../../Images/2.jpg") } style={{width:200,height:120,opacity:this.state.opacity}}>

                </Image>
            </TouchableHighlight>
        );
    }
}