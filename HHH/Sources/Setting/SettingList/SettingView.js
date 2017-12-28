/**
 * Created by zhuzihao on 2017/8/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,Image,
    View,TouchableOpacity,FlatList,Switch
} from 'react-native';
import { CreateStyle } from  "./SettingCell"
class IndexPath{
    section = 0;
    index = 0;
    constructor(section=0,index=0){
        this.section=section;
        this.index=index;
    }
}
const  styles = StyleSheet.create({
    Separator:{
        height:1,
        paddingLeft:25
    }
});

class SeparatorComponent extends Component{
    render(){
        return (
            <View></View>
        );
    }
}

export class SettingView extends Component{
    constructor(ops){
        super(ops);
        CreateStyle(ops.cellStyle)
        this.state={
            items:ops.items
        };
    }
    componentWillReceiveProps(ops){
        this.state={
            items:ops.items
        };
    }
    _renderItem=({item,index})=>{
        return (
            <item.component  item={ item } click={ this._didclick } index={ new IndexPath(0,index) }>

            </item.component>
        );
    };
    //cell 被点击
    _didclick=(item,index)=>{
        if(this.props.clickCallBack){
            this.props.clickCallBack(item,index)
        }
    };
    render(){
        return (
            <FlatList
                //bounces={false}
                data={this.state.items}
                extraData={this.state}
                renderItem={ this._renderItem }
                keyExtractor={ (item,index)=>{
                    return item.title+`_${index}`
                } }
                ItemSeparatorComponent={ ()=>{
                    return (
                        <View style={ [styles.Separator,{paddingLeft:this.props.SeparatorStyle && this.props.SeparatorStyle.paddingLeft || 25 }] }>
                            <View style={[{backgroundColor:"red",flex:1},this.props.Separator]}></View>
                        </View>
                    );
                } }
            >
            </FlatList>
        )
    }
}
SettingView.propTypes={
    //指定数据
    items:React.PropTypes.array.required,
    //再点击cell时回调 你可以改变item 再返回 以改变其状态
    clickCallBack:React.PropTypes.func.required,
    cellStyle:React.PropTypes.shape({
        height:React.PropTypes.number,
        backgroundColor:React.PropTypes.string
    }),
    Separator:React.PropTypes.shape({
        height:React.PropTypes.number,
        backgroundColor:React.PropTypes.string,
        paddingLeft:React.PropTypes.number,
    })
};