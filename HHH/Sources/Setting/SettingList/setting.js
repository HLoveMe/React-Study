/**
 * Created by zhuzihao on 2017/8/2.
 */

/**
 * Created by zhuzihao on 2017/8/2.
 */
/**
 * Created by zhuzihao on 2017/8/2.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from "react-navigation"
import { SettingView} from "./SettingView"
import { AssistType,SettingModel,SettingSwitchModel,SettingArrowModel,SettingActivityModel } from "./SettingModel"

const styles = StyleSheet.create({
    con:{
        width:100,
        height:100,
        backgroundColor:"red",

    },
    title:{
        height:30,
        backgroundColor:"yellow"
    }

})
export class Setting extends Component{
    static navigationOptions={
        title:"Setting"
    };
    items=[];
    constructor(ops){
        super(ops)
        this.items=[
            new SettingModel("","AAA0","aaa"),
            new SettingArrowModel("","AAA1","aaa"),
            new SettingArrowModel("","AAA2","aaa"),
            new SettingArrowModel("","AAA3","aaa"),
            new SettingArrowModel("","AAA4","aaa"),
            new SettingSwitchModel("","AAA5","aAA",true,(value)=>{
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve(true)
                    },3000)
                });
            }),
            new SettingActivityModel("","AAA6","",true),
            new SettingModel("","AAA7","aaa"),
        ];
        this.state={
            items:this.items
        }
    }
    render(){
        return (
            <View style={{flex:1}}>
                <SettingView cellStyle={{height:60}} Separator={{paddingLeft:10}} style={{flex:1}} items={ this.state.items } clickCallBack={ (item,{section,index})=>{
                    /**
                        item.subTitle= "朱子豪";
                        var items = this.items.map(a=>a);
                        this.setState({items})
                     */
                } }>

                </SettingView>
            </View>
        );
    }
}

export const SettingNav = StackNavigator({
    setting:{screen:Setting}
},{
    initialRouteName:'setting'
});