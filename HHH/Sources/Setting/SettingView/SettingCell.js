/**
 * Created by zhuzihao on 2017/8/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,Image,
    View,TouchableOpacity,FlatList,Switch,ActivityIndicator
} from 'react-native';

import  SettingContants  from "./SettingContants"
styles={};
export function CreateStyle(style) {
    let cellHeight = style && style.height || SettingContants.cellDefaultHeight;
    let bk = style && style.backgroundColor || SettingContants.cellDefaultBKColor;
    styles = StyleSheet.create({
        cell:{
            height:cellHeight,
            flexDirection:"row",
            backgroundColor:bk
        },
        cell_icon:{
            height:cellHeight,
            width:SettingContants.cellIconWidth,
            marginLeft:SettingContants.cellIconMarginLeft
        },

        cell_title:{
            height:cellHeight,
            lineHeight:cellHeight,
            paddingLeft:SettingContants.cellTitleMarginLeft,
            fontSize:SettingContants.cellTitleFontSize,
            color:SettingContants.cellTitleColor
        },
        cell_subTitle:{
            height:cellHeight,
            lineHeight:cellHeight,
            fontSize:SettingContants.cellSubTitleFontSize,
            color:SettingContants.cellSubTitleColor,
            paddingRight:SettingContants.cellSubTitlePaddingRight,
            position:"absolute",
            right:SettingContants.cellRight
        },
        cell_arrow:{
            position:"absolute",
            width:SettingContants.cellArrowWith,
            height:SettingContants.cellArrowHeight,
            right:SettingContants.cellArrowRight,
            top:(cellHeight - SettingContants.cellArrowHeight)/2
        },
        cell_switch:{
            position:"absolute",
            right:SettingContants.cellSwitchRight,
            top:(cellHeight-31)/2
        },
        cell_activity:{
            position:"absolute",
            right:SettingContants.cellActivityRight,
            top:(cellHeight-20)/2
        },
        cell_switch_subText:{
            right:SettingContants.cellSubTitleRight.Switch
        },
        cell_none_subText:{
            right:SettingContants.cellSubTitleRight.None
        },
        cell_activity_subText:{
            right:SettingContants.cellSubTitleRight.Activity
        }
    });
}

CreateStyle(SettingContants.cellDefaultHeight);

class Cell extends  Component{
    constructor(ops){
        super(ops)
    }
    _click = ()=>{
        if(this.props.click){
            this.props.click(this.state.item,this.props.index);
        }
    };
    _iconRender=()=>{
        if(!this.state.item.icon){
            return (<View></View>);
        }
        return (
            <Image resizeMode={ "center" } source={ this.state.item.icon } style={[styles.cell_icon]}>

            </Image>
        );
    }
}
export class SettingCell extends Cell{
    constructor(ops){
        super(ops);
        this.state={
            item:this.props.item
        }
    }
    render(){
        return (
            <TouchableOpacity activeOpacity={ 1 } onPress={ this._click }>
                <View style={ [styles.cell] }>
                    {
                        this._iconRender()
                    }
                    <Text numberOfLines={1} style={ [styles.cell_title] }>
                        {
                            this.state.item.title
                        }
                    </Text>
                    <Text numberOfLines={1} style={[styles.cell_subTitle,styles.cell_none_subText]}>
                        {
                            this.state.item.subTitle
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
export class SettingArrowCell extends Cell{
    constructor(ops){
        super(ops);
        this.state={
            item:this.props.item
        }
    }
    render(){
        return (
            <TouchableOpacity activeOpacity={ 1 } onPress={ this._click }>
                <View style={ [styles.cell] }>
                    {
                       this._iconRender()
                    }
                    <Text numberOfLines={1} style={ [styles.cell_title] }>
                        {
                            this.state.item.title
                        }
                    </Text>
                    <Text numberOfLines={1} style={[styles.cell_subTitle]}>
                        {
                            this.state.item.subTitle
                        }
                    </Text>

                    <Image style={ [styles.cell_arrow] } source={ require("./right2.png") }>

                    </Image>
                </View>
            </TouchableOpacity>
        );
    }
}

export class SettingSwitchCell extends Cell{
    constructor(ops){
        super(ops);
        this.state={
            item:this.props.item,
            value:this.props.item.value
        }
    }
    render(){
        return (
            <TouchableOpacity activeOpacity={ 1 } onPress={ this._click }>
                <View style={ [styles.cell] }>
                    {
                        this._iconRender()
                    }
                    <Text numberOfLines={1} style={ [styles.cell_title] }>
                        {
                            this.state.item.title
                        }
                    </Text>
                    <Text numberOfLines={1} style={[styles.cell_subTitle,styles.cell_switch_subText]}>
                        {
                            this.state.item.subTitle
                        }
                    </Text>
                    <Switch tintColor="#53D669" value={ this.state.value } style={ [styles.cell_switch] } onValueChange={
                        (value)=>{
                            this.setState({value});
                            if(this.state.item.assistCall){
                                let _value = this.state.item.assistCall(value);
                                if (typeof(_value) == "boolean"){
                                    this.setState({value:_value})
                                }else if(typeof(_value.then) != "undefined"){
                                    _value.then((__value)=>{
                                        this.setState({value:__value})
                                    })
                                }
                            }
                        }
                    }>

                    </Switch>
                </View>
            </TouchableOpacity>
        );
    }
}

export class SettingActivityCell extends Cell{
    constructor(ops){
        super(ops);
        this.state={
            item:this.props.item,
            animation:this.props.item.animation
        }
    }
    render(){
        return (
            <TouchableOpacity activeOpacity={ 1 } onPress={ this._click }>
                <View style={ [styles.cell] }>
                    {
                        this._iconRender()
                    }
                    <Text numberOfLines={1} style={ [styles.cell_title] }>
                        {
                            this.state.item.title
                        }
                    </Text>
                    <Text numberOfLines={1} style={[styles.cell_subTitle,styles.cell_activity_subText]}>
                        {
                            this.state.item.subTitle
                        }
                    </Text>
                    <ActivityIndicator style={ [styles.cell_activity] } animating={this.state.animation} hidesWhenStopped={true}>

                    </ActivityIndicator>
                </View>
            </TouchableOpacity>
        );
    }
}