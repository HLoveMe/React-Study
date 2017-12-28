/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,NavigatorIOS,ScrollView,Dimensions
} from 'react-native';
import {
    StackNavigator,TabNavigator,NavigationActions
} from "react-navigation"
import { APIS } from "./Source/ios/API.ios"
//nav 导航
class ChatHome extends Component {
    constructor(ops){
        super(ops);
        Dimensions.addEventListener("change",function (a) {
            console.log(a)
        })

    }
    componentDidMount(){

        navigator.geolocation.watchPosition((ops)=>{
            console.log(ops)
        },(ops)=>{
            console.log(ops)
        });
    }
    render(){
        return (
            <NavigatorIOS style={{flex:1}} ref="nav" initialRoute={
                {
                    component:Chat,
                    title:'AS',
                    rightButtonTitle:"朱子豪",
                    onRightButtonPress:()=>{
                        this.refs.nav.push({
                            component:ChatInfo,
                            title:'ChatInfo',
                            passProps:{"name":"ZZH"},
                        })
                    }
                }
            }  >
            </NavigatorIOS>
        );
    }
}
//导航root
class Chat extends Component{
    constructor(op){
        super(op)
    }
    render(){
        return (
            <View style={{backgroundColor:'yellow',flex:1}}>

            </View>
        );
    }
}
class ChatInfo extends Component{

    render() {
        return (
            <View style={{flex: 1,marginTop:100}}>
                <Text onPress={ ()=>{this.props.navigator.pop()}}>{this.props.name} Touch Back</Text>
            </View>
        );
    }
}


//Home

class  Home extends Component{
    static  navigationOptions ={
        title:"首页",
    }
    timer=null
    constructor(props){
        super(props);
        this.timer = requestAnimationFrame(()=>{
            console.log(1)
        })
    }
    render(){
        return (
            <View style={ {flex:1} }>
                <ScrollView style={{flex:1}}>
                    <Button onPress={ ()=>{this.props.navigation.navigate("pan")} } title='手势系统'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("activity")} } title='activity'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("button")} } title='button'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("DatePickerIOS")} } title='DatePickerIOS'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("modal")} } title='Modal'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("keywords")} } title='keywords'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("progress")} } title='progress'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("scroll")} } title='scroll'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("text")} } title='text'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("textinput")} } title='textinput'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("web")} } title='web'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("flat")} } title='flat'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("section")} } title='section'></Button>
                    <Button onPress={ ()=>{this.props.navigation.navigate("api")} } title='API'></Button>
                </ScrollView>
            </View>
        );
    }
}


const  HomeNav = StackNavigator({
    home:{screen:Home},
    pan:{getScreen:()=>{
        return require("./Source/ios/PanResponder.ios").default
    }},
    activity:{
        getScreen:()=>{
            return require("./Source/ios/ActivityIndicator.ios").default
        },
        path:"aaaa"
    },
    button:{
        getScreen:()=>{
            return require("./Source/ios/Button.ios").default
        }
    },
    DatePickerIOS:{
        getScreen:()=>{
            return require("./Source/ios/DatePickerIOS.ios").default
        }
    },
    modal:{
        getScreen:()=>{
            return require("./Source/ios/Model.ios").default
        }
    },
    keywords:{
        getScreen:()=>{
            return require("./Source/ios/KeyboardAvoidingView.ios").default
        }
    },
    progress:{
        getScreen:()=>{
            return require("./Source/ios/ProgressViewIOS.ios").default
        }
    },
    scroll:{
        getScreen:()=>{
            return require("./Source/ios/ScrollView.ios").default
        }
    },
    text:{
        getScreen:()=>{
            return require("./Source/ios/Text.ios").default
        }
    },
    textinput:{
        getScreen:()=>{
            return require("./Source/ios/TextInput.ios").default
        }
    },
    web:{
        getScreen:()=>{
            return require("./Source/ios/WebView.ios").default
        }
    },
    flat:{
        getScreen:()=>{
            return require("./Source/ios/FlatListV").default
        }
    },
    section:{
        getScreen:()=>{
            return require("./Source/ios/SectionV").default
        }
    },
    api:{
        getScreen:()=>{
            return require("./Source/ios/API.ios").default
        }
    },
    ...APIS
},{
    initialRouteName:"home"
});


export const Router =  TabNavigator({
    //hmbbf://home/aaaa
    Home:{screen:HomeNav,path:"home"},
    Chat:{screen:ChatHome,path:'chat'}
},{
    initialRouteName:"Home",
    order:["Chat","Home"],
    backBehavior:true
});


const BB = () => <Router uriPrefix={'hmbbf://'}/>

AppRegistry.registerComponent('MyApp',()=>BB );