/**
 * Created by zhuzihao on 2017/8/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,Image,
    View,TouchableOpacity,FlatList,Switch,ActivityIndicator
} from 'react-native';


styles={};
export function CreateStyle(style) {
    let cellHeight = style && style.height || 44;
    let bk = style && style.backgroundColor || "white";
    styles = StyleSheet.create({
        cell:{
            height:cellHeight,
            flexDirection:"row",
            backgroundColor:bk
        },
        cell_icon:{
            height:cellHeight,
            width:47,
            marginLeft:16
        },

        cell_title:{
            height:cellHeight,
            lineHeight:cellHeight,
            paddingLeft:16,
            fontSize:14,
            color:"black"
        },
        cell_subTitle:{
            height:cellHeight,
            lineHeight:cellHeight,
            fontSize:14,
            color:"black",
            paddingRight:10,
            position:"absolute",
            right:34
        },
        cell_arrow:{
            position:"absolute",
            width:8,
            height:13,
            right:16,
            top:(cellHeight - 13)/2
        },
        cell_switch:{
            position:"absolute",
            right:10,
            top:(cellHeight-31)/2
        },
        cell_activity:{
            position:"absolute",
            right:10,
            top:(cellHeight-20)/2
        },
        cell_switch_subText:{
            right:61
        },
        cell_none_subText:{
            right:10
        },
        cell_activity_subText:{
            right:40
        }
    });
}

CreateStyle(44);

class Cell extends  Component{
    constructor(ops){
        super(ops)
    }
    _click = ()=>{
        if(this.props.click){
            this.props.click(this.state.item,this.props.index);
        }
    };
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
                    <Image resizeMode={ "center" } source={ this.state.item.icon } style={[styles.cell_icon]}>

                    </Image>
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
                    <Image resizeMode={ "center" } source={ this.state.item.icon } style={[styles.cell_icon]}>

                    </Image>
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
                    <Image resizeMode={ "center" } source={ this.state.item.icon } style={[styles.cell_icon]}>

                    </Image>
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
                    <Image resizeMode={ "center" } source={ this.state.item.icon } style={[styles.cell_icon]}>

                    </Image>
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