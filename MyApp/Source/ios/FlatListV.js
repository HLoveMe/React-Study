/**
 * Created by zhuzihao on 2017/7/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,FlatList,Button,TouchableWithoutFeedback
} from 'react-native';
const  styles = StyleSheet.create({
    list:{
        flex:1,
        backgroundColor:'red'
    },
    oneRow:{

    }
});

class EmptyComponent extends  React.PureComponent{
    render(){
        return (
            <View style={ {height:20,backgroundColor:"green"} }></View>
        );
    }
}
export default class NEWS extends React.PureComponent{

    static navigationOptions  =  {
        tabBarVisible:false
    }
    _list=null;
    constructor(ops){
        super(ops);
        this.state={
            fresh:false,
            data:[]
        }
    }
    componentDidMount(){
        var  data = [];
        for(var i = 0 ;i<20;i++){
            data.push({content:"cell"})
        }
        this.setState({data})
    }
    getData=(more)=>{
        var temp  = [];
        for(var i =0;i<10;i++){
            temp.push({content:"cell"})
        }
        this.setState({data:temp.concat(this.state.data)});
    }
    _ListEmptyComponent=()=>{
        return (
            <Text>
                裂变为空是加载
            </Text>
        );
    }
    _SeparatorComponent=()=>{
        return (
            <View style={{height:2,backgroundColor:'yellow'}}></View>
        );
    }
    _onPress=(item)=>{
        console.log("点击",item);
        this._list.flashScrollIndicators();

    }
    _renderItem=({item,index})=>{
        return (
        <TouchableWithoutFeedback onPress={ ()=>{
            var item = this.state.data[index];
            this._onPress(item);
            //最好cell 封装为组件  这样可以直接保存 item
        } } style={{flex:1}}>
            <View style={ {height:44,flex:1} }>
                <Text style={{textAlign:"center",fontSize:20,flex:1,lineHeight:44}}>
                    {
                        `这是第`+`${index}`+`内容`
                    }
                </Text>
            </View>
        </TouchableWithoutFeedback>

        );
    }

    _renderItem2=({item,index})=>{
        return (
        <View  style={ {flex:1,borderColor:'black',borderWidth:1,width:200} }>
            <Text  style={{textAlign:"center",fontSize:20,flex:1,lineHeight:44}}>
                {
                    `这是第`+`${index}`+`内容`
                }
            </Text>
        </View>
        );
    }
    _getItemLayout=(data,index)=>{
        /**
         *  可选的优化性能选项
         *  你必须提前知道每项的高度
         *  要包含你指定分割组件高度
         *
         *  {
         *      length:高度
         *      offset: X
         *      index:index
         *  }
         * */
        return {
            length:44,
            offset:(44+2)*index,
            index
        }
    }
    _getItemLayout2= (data,index)=>{
        return {
            length:44,
            offset:(44+2)*index,
            index
        }
    }
    _onRefresh=()=>{
        //本身修改state 引用指针
        this.setState({fresh:true});
        setTimeout(()=>{
            this.getData(false)
            this.setState({fresh:false});
        },2000)
    }
    _onEndReached=(info)=>{
        console.log("上拉")
        setTimeout(()=>{
            this.getData(true);
        },2000);
    }
    render(){
        return (

            <FlatList ref={(list)=>{this._list=list;}} style={ styles.list }
                      ListEmptyComponent={EmptyComponent}
                      ListFooterComponent={EmptyComponent}
                      ListHeaderComponent={EmptyComponent}
                      ItemSeparatorComponent={ this._SeparatorComponent }
                      data={this.state.data}
                      extraData={this.state}
                      renderItem = { this._renderItem }
                      getItemLayout={ this._getItemLayout }
                      initialNumToRender={12}
                      //initialScrollIndex={3}
                      keyExtractor={ (item,index)=>{
                          return `${index}`
                      } }
                      refreshing={this.state.fresh}
                      onRefresh={ this._onRefresh }

                      onEndReachedThreshold={ -0.2 }
                      onEndReached={ this._onEndReached }

                      onViewableItemsChanged={
                          (info)=>{
                              console.log(1111,info,new Date().getTime());
                          }
                      }
                      viewabilityConfig= { {
                          minimumViewTime: 3000,
                          viewAreaCoveragePercentThreshold: 100,
                          waitForInteraction: false,
                      } }
            >
            </FlatList>

            /**
            <FlatList style={ styles.list }
                      ListEmptyComponent={EmptyComponent}
                      ListFooterComponent={EmptyComponent}
                      ListHeaderComponent={EmptyComponent}
                      ItemSeparatorComponent={ this._SeparatorComponent }
                      data={this.state.data}
                      extraData={this.state}
                      renderItem = { this._renderItem }
                      //getItemLayout={ this._HgetItemLayout }
                      horizontal={false}
                      numColumns={2}
                      columnWrapperStyle={
                        {
                            borderColor:'black',
                            borderWidth:2
                        }
                      }

                      keyExtractor={ (item,index)=>{
                          return `${index}`
                      } }
                      refreshing={this.state.fresh}
                      onRefresh={ this._onRefresh }

                      //onEndReachedThreshold={ -0.2 }
                      //onEndReached={ this._onEndReached }
            >
            </FlatList>
             */
            /**
            <FlatList style={ styles.list }
                      ListEmptyComponent={EmptyComponent}
                      ListFooterComponent={EmptyComponent}
                      ListHeaderComponent={EmptyComponent}
                      ItemSeparatorComponent={ this._SeparatorComponent }
                      data={this.state.data}
                      extraData={this.state}
                      renderItem = { this._renderItem2 }
                      //getItemLayout={ this._getItemLayout2 }
                      horizontal = {true}
                      keyExtractor={ (item,index)=>{
                          return `${index}`
                      } }
                      //不支持上拉 下拉

            >
            </FlatList>
             */
        );
    }
}