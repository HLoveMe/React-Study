/**
 * Created by zhuzihao on 2017/7/31.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,ScrollView,AppState
} from 'react-native';

export  default  class AppStateV extends Component{
    constructor(ops){
        super(ops)
        this.state={
            states:[],
            state:AppState.currentState
        }

    }
    componentDidMount(){

        AppState.addEventListener("change",(appState)=>{
            this.setState({
                states:this.state.states.concat(appState)
            })
        })
    }

    render(){
        return (
            <View>
                <Text>
                    { JSON.stringify(this.state.states) }
                </Text>
                <View style={ {
                    height:300,
                    backgroundColor:'red'
                } }>
                    <View style={{
                        width:100,
                        height:100,
                        position:"absolute",
                        backgroundColor:"yellow",
                        right:10,
                        bottom:10

                    }}>

                    </View>

                </View>
            </View>
        );
    }
}