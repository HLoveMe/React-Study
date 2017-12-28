/**
 * Created by zhuzihao on 2017/7/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Sec,SectionList,TouchableWithoutFeedback
} from 'react-native';

export default class SectionV extends React.PureComponent{
    constructor(ops){
        super(ops)
        this.state={
            data:[],
            dataw:[]
        }
    }
    componentDidMount(){
        var data=[];
        for(var i =0 ;i<10;i++){
            data.push({content:`${i}`+"B"});
        }
        var dataw=[];
        for(var j =10 ;j<20;j++){
            dataw.push({content:`${j}`+"B"});
        }
        this.setState({
            data:data,
            dataw:dataw
        })
    }
    render(){
        return (
            <SectionList
                keyExtractor={
                    (item,index)=>{
                        return String(item)+`${index}`;
                    }
                }
                renderSectionHeader={
                    ({section})=>{
                        return (
                            <View style={{height:44,backgroundColor:"yellow"}}>

                            </View>
                        );
                    }
                }

                stickySectionHeadersEnabled={true}
                sections={
                    [
                        {
                            data:this.state.data,
                            key:"section1",
                            renderItem:({item,index})=>{
                                return (
                                    <View >
                                        <Text style={ {height:33,textAlign:'center',lineHeight:33} }>{item.content}</Text>
                                    </View>
                                );
                            },
                            ItemSeparatorComponent:()=>{
                                return (
                                    <View style={{height:1,backgroundColor:'green'}}></View>
                                );
                            }
                        },
                        {
                            data:this.state.dataw,
                            key:"section2",
                            renderItem:({item,index})=>{
                                return (
                                    <View >
                                        <Text style={ {height:33,textAlign:'center',lineHeight:33} }>{item.content}</Text>
                                    </View>
                                );
                            },
                            ItemSeparatorComponent:()=>{
                                return (
                                    <View style={{height:1,backgroundColor:'green'}}></View>
                                );
                            }
                        }

                    ]
                }
            >

            </SectionList>
        );
    }
}