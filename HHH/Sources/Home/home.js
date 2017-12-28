/**
 * Created by zhuzihao on 2017/8/2.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,Easing,Animated,
    View,Image,TouchableOpacity,NativeModules,NativeEventEmitter
} from 'react-native';
import watch from 'redux-watch'
var self;
import { StackNavigator } from "react-navigation"
const  Store = require("../redux/Reducer").default
import {Types} from "../redux/ActionTypes"
import ReduxList from "./ReduxMsgView"
class ListFooterComponent extends Component{
    onPress=(desc)=>{
        Store.dispatch({
            type:desc,
            filter:desc
        })
    };
    render(){
        return (
            <View style={ {height:60,backgroundColor:"green"} } >
                <Text style={{flex:1,textAlign:'center'}} onPress={()=>{
                    this.onPress(Types.HomeActionTypes.Filter_None);
                }}>
                    All
                </Text>
                <Text style={{flex:1,textAlign:'center'}} onPress={()=>{
                    this.onPress(Types.HomeActionTypes.Filter_One);
                }}>
                    1111
                </Text>
                <Text style={{flex:1,textAlign:'center'}} onPress={()=>{
                    this.onPress(Types.HomeActionTypes.Filter_Two);
                }}>
                    22222
                </Text>
                <Text style={{flex:1,textAlign:'center'}} onPress={()=>{
                    this.onPress(Types.HomeActionTypes.Filter_There);
                }}>
                    3333
                </Text>
            </View>
        );
    }
}
class Home extends Component{
    persousID=null;
    constructor(ops){
        super(ops);
        this.state={
            data:datas
        };
        self= this;
        let w = watch(Store.getState,"home.ListFilter.filter");

        Store.subscribe(w((newV,oldPath,Path)=>{
            console.log(newV,oldPath,Path)
        }));

        let IDW = watch(Store.getState,"home.delete.deleteID")
        Store.subscribe(IDW((newV)=>{
            console.log(newV);
            var data = this.state.data.filter((item)=>item.id != newV);
            this.setState({
                data
            })
        }))

        // Store.subscribe(()=> {
        //     var state = Store.getState();
        //     if (state.home.delete && state.home.delete.deleteID != this.persousID){
        //         this.persousID = state.home.delete.deleteID;
        //         var data = this.state.data.filter((item)=>item.id != state.home.delete.deleteID);
        //         this.setState({
        //             data
        //         })
        //     }
        // })
    }
    static navigationOptions={
        title:"Home",
        tabBarIcon:({focused})=>{
            console.log(focused);
            return (<Image source={require("../../images/toolbar/tabbar_home.png")}/>);
        },
        headerRight:(
            <TouchableOpacity activeOpacity={1} onPress={ ()=>{self.seach()} }>
                <View style={{backgroundColor:"red",width:60,height:35}}>
                    <Text style={{textAlign:"center",lineHeight:35}} >搜索3.0.0</Text>
                </View>
             </TouchableOpacity>
        ),
        headerLeft:(
            <TouchableOpacity activeOpacity={1} onPress={ ()=>{self.openORclose()} }>
                <View style={{backgroundColor:"red",width:60,height:35}}>
                    <Text style={{textAlign:"center",lineHeight:35}} >open/close</Text>
                </View>
            </TouchableOpacity>
        )
    }
    openORclose=()=>{
        this.props.navigation.navigate("DrawerOpen")
    }
    componentDidMount(){
    }
    componentWillUnmount(){

    }
    seach=()=>{
        Store.dispatch((dispatch)=>{
                fetch("https://ss1.bdstatic.com/5aV1bjqh_Q23odCf/static/message/js/mt_show_1.8.js").then(response=>{
                  return response.text()
                }).then(text=>{
                    dispatch({
                        type:Types.HomeActionTypes.NewDataGET,
                        text:text
                    })
                }).catch(err=>{

                });
        });
        this.props.navigation.navigate("seach");
    }
    render(){
        return (
        <Animated.View style={{flex:1,backgroundColor:'red'}}>
            <ListFooterComponent></ListFooterComponent>
            <ReduxList data={ this.state.data }></ReduxList>
        </Animated.View>
        );
    }
}


export const HomeNav = StackNavigator({
    home:{screen:Home},
    seach:{getScreen:()=>{
        return require("./seach/seacher").default
    }}
},{
    initialRouteName:'home'
});


const  datas=[
    {
        id:1,
        type:1,
        name:"A1"
    },
    {
        id:2,
        type:1,
        name:"B1"
    },
    {
        id:3,
        type:1,
        name:"C1"
    },
    {
        id:4,
        type:1,
        name:"D1"
    },{
        id:5,
        type:2,
        name:"B2"
    },
    {
        id:6,
        type:2,
        name:"B2"
    },
    {
        id:7,
        type:2,
        name:"C2"
    },
    {
        id:8,
        type:2,
        name:"D2"
    },{
        id:9,
        type:3,
        name:"A3"
    },
    {
        id:10,
        type:3,
        name:"B3"
    },
    {
        id:11,
        type:3,
        name:"C3"
    },
    {
        id:12,
        type:3,
        name:"D3"
    }
];