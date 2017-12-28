/**
 * Created by zhuzihao on 2017/8/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,Image,
    View,TouchableOpacity,SectionList,Switch,FlatList
} from 'react-native';
import { CreateStyle } from  "./SettingCell"
import { SettingGroup } from "./SettingModel"
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
    },
    SectionHeader:{
        paddingVertical:10,
        paddingLeft:15,
    },

});

export class SettingView extends Component{
    constructor(ops){
        super(ops);
        CreateStyle(ops.cellStyle);
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
    _renderItems=()=>{
        var sections = [];
        for (var j = 0 ;j<this.state.items.length;j++){
            let items = this.state.items[j].items;
            var one = {
                data:items,
                extraData:this.state.items[j],
                index:j,
                key:"section"+`${j}`,
                renderItem:({item,index})=>{
                    return (
                        <item.component  item={ item } click={ this._didclick } index={ new IndexPath(one.index,index) }>

                        </item.component>
                    );
                },
            };
            sections.push(one)
        }
        return sections;
    };
    //cell 被点击
    _didclick=(item,index)=>{
        if(this.props.clickCallBack){
            this.props.clickCallBack(item,index)
        }
    };
    _renderHeader =({section})=>{
        return (
            <Text style={[ styles.SectionHeader , this.props.SectionHeaderStyle]}>
                {
                    section.extraData.title
                }
            </Text>
        );
    };
    render(){
        if(!(this.state.items && this.state.items[0])){return (<View></View>)}
        if(this.state.items[0] instanceof SettingGroup){
            return (
                <SectionList
                    keyExtractor={
                        (item,index)=>{
                            return item.title+`${index}`;
                        }
                    }
                    sections={
                        this._renderItems()
                    }
                    renderSectionHeader={
                        this._renderHeader
                    }
                    stickySectionHeadersEnabled={ true }
                    ItemSeparatorComponent={ ()=>{
                        return (
                            <View style={ [styles.Separator,{paddingLeft:this.props.SeparatorStyle && this.props.SeparatorStyle.paddingLeft || 25 }] }>
                                <View style={[{backgroundColor:"red",flex:1},this.props.SeparatorStyle]}></View>
                            </View>
                        );
                    } }
                    ListFooterComponent={
                        this.props.ListFooterComponent
                    }
                    ListHeaderComponent = {
                        this.props.ListHeaderComponent
                    }
                >

                </SectionList>
            )
        }else {
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
                    ListFooterComponent={
                        this.props.ListFooterComponent
                    }
                    ListHeaderComponent = {
                        this.props.ListHeaderComponent
                    }
                >
                </FlatList>
            )

        }
    }



}
SettingView.propTypes={
    //指定数据
    items:React.PropTypes.array,
    //再点击cell时回调 你可以改变item 再返回 以改变其状态
    clickCallBack:React.PropTypes.func,
    cellStyle:React.PropTypes.shape({
        height:React.PropTypes.number,
        backgroundColor:React.PropTypes.string
    }),
    SeparatorStyle:React.PropTypes.shape({
        height:React.PropTypes.number,
        backgroundColor:React.PropTypes.string,
        paddingLeft:React.PropTypes.number,
    }),
    //分组独有 Text
    SectionHeaderStyle:React.PropTypes.shape(),
    //表头表位
    ListFooterComponent:React.PropTypes.object,
    ListHeaderComponent:React.PropTypes.object,
};