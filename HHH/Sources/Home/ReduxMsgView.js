/**
 * Created by zhuzihao on 2017/8/8.
 */
import React, { Component ,PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,FlatList,
    View,Button,TouchableOpacity,NativeModules,TouchableWithoutFeedback
} from 'react-native';

import {connect} from "react-redux"
import { Types } from "../redux/ActionTypes"
import  Store from "../redux/Reducer"
class  MsgCell extends  PureComponent{
    constructor(ops){
        super(ops)
        this.state={
            item:ops.item,
            index:ops.index
        }
    }
    render(){
        return (
        <TouchableWithoutFeedback onPress={
            ()=>{
                if(this.props.onPress){
                    this.props.onPress(this.state.item,this.state.index)
                }
            }
        }>
            <View {...this.props}>
                <Text style={{textAlign:"center"}}>
                    {this.state.item.name}
                </Text>
            </View>
        </TouchableWithoutFeedback>
        );
    }
}

//列表组件
class MsgView extends PureComponent{
    constructor(ops){
        super(ops);
    }
    onPress=(item,index)=>{
        this.props.onClick(item.id)
    };
    render(){
        console.log("渲染")
        return (
            <FlatList
                data={this.props.data}
                extraData={this.props}
                renderItem={
                    ({item,index})=>{
                        return (
                            <MsgCell item = { item } onPress={ this.onPress } index={index}>
                            </MsgCell>
                        );
                    }
                }
                keyExtractor={ (item)=>{
                    return `${item.id}`
                } }
            >
            </FlatList>
        );
    }
}
const  filterMsg = (filter,data)=>{
    var res;
    switch (filter){
        case Types.HomeActionTypes.Filter_One:
            res = data.filter(item=>item.type==1);
            break;
        case Types.HomeActionTypes.Filter_Two:
            res = data.filter(item=>item.type==2)
            break;
        case Types.HomeActionTypes.Filter_There:
            res = data.filter(item=>item.type==3)
            break;
        case Types.HomeActionTypes.Filter_None:
        default:
            res = data;
    }
    return res;

}
//容器组件
const mapStateToProps = (state,pros) => {
    //外部数据传递到组件内

    //该方法是吧Redux 状态 响应到组件Props上
    //state 为Redux 总的状态
    //props 最初的组件props对象
    return {
        data:filterMsg(state.home.ListFilter.filter,pros.data)
    }
};
const mapDispatchToProps = (dispatch,pros)=>{
    //组件事件传递到外部
    // 定义的事件新响应到props以供调用
    //dispatch 为Store 发布函数
    // props
    return {
        onClick:(ID)=>{
            dispatch({
                type:Types.HomeActionTypes.Delete_Msg,
                id:ID
            })
        }
    }
};

const  ReduxList = connect(mapStateToProps,mapDispatchToProps)(MsgView);

export  default   ReduxList;