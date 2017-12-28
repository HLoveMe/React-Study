/**
 * Created by zhuzihao on 2017/7/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,ScrollView,LayoutAnimation
} from 'react-native';
import  LayoutAnimationV  from "./APIS/LayoutAnimation"
const  styles = StyleSheet.create({
    scroll:{
        flex:1
    }
})
export default class APIVC extends Component{
    static navigationOptions={
        tabBarVisible:false,
        headerTitle:"API",
        headerBackTitle:"AA"
    }
    render(){
        return (
            <ScrollView style={ styles.scroll }>
                <Button title={"ActionSheetIOS"}  onPress={()=>{this.props.navigation.navigate('ActionSheetIOS')}}></Button>
                <View style={ {height:1,backgroundColor:'red'} } ></View>
                <Button title={"AlertIOS"}  onPress={()=>{this.props.navigation.navigate('AlertIOS')}}></Button>
                <View style={ {height:1,backgroundColor:'red'} } ></View>
                <Button title={"animation"}  onPress={()=>{this.props.navigation.navigate('animation')}}></Button>
                <View style={ {height:1,backgroundColor:'red'} } ></View>
                <Button title={"state"}  onPress={()=>{this.props.navigation.navigate('state')}}></Button>
                <View style={ {height:1,backgroundColor:'red'} } ></View>
                <Button title={"LayoutAnimation"}  onPress={()=>{this.props.navigation.navigate('imagePick')}}></Button>
            </ScrollView>
        );
    }

}
export const APIS={
    ActionSheetIOS:{
        getScreen:()=>{
            return require("./APIS/ActionSheetIOS").default
        }
    },
    AlertIOS:{
        getScreen:()=>{
            return require("./APIS/AlertIOS").default
        }
    },
    animation:{
        getScreen:()=>{
            return require("./APIS/Animation").default
        }
    },
    state:{
        getScreen:()=>{
            return require("./APIS/AppState").default
        }
    },
    imagePick:{screen:LayoutAnimationV}

}