/**
 * Created by zhuzihao on 2017/7/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,ScrollView,RefreshControl,StatusBar
} from 'react-native';

const  styles = StyleSheet.create({
    page:{
        height:200,
        backgroundColor:'yellow',
    },
    scroll:{
        flex:1,
        backgroundColor:'orange'
    },
    image:{
        // width:'100%',
        // height:'100%',
    }
}) ;
export default class ScrollViewT extends Component{
    images=[
        require("../../Images/2.jpg"),
        require("../../Images/1.jpg")
    ]
    constructor(ops){
        super(ops)
        this.state= {
            loading: false
        }
    }
    createImages = ()=>{
        var as = [];
        for (var i = 0 ;i<2;i++){
                as.push(
                    <View key={i} style={ {width:300,overflow:'hidden'} }>
                        <Image  source ={ this.images[i] } style={ {width:300,height:200} } resizeMode='stretch'>

                        </Image>
                    </View>
                )
        }
        return as;
    }
    onLoaging = ()=>{
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            this.setState({
                loading:false
            })
        },3000)
    }
    render(){
        const  colors = ["red",'yellow',"blue","green","orange"]
        return (
            <View style={ {flex:1} }>
                <StatusBar barStyle='light-content'>

                </StatusBar>
                <View style={ styles.page }>
                    <ScrollView style={ styles.scroll }  horizontal={ true } showsHorizontalScrollIndicator={true}>
                        <Image source={ require("../../Images/2.jpg") }>

                        </Image>
                    </ScrollView>
                </View>
                <View style={ {width:300,height:200} }>
                    <ScrollView  style={ styles.scroll }  contentContainerStyle={{paddingVertical:20}} pagingEnabled={true} horizontal={ true } showsHorizontalScrollIndicator={true}>
                        {
                            this.createImages()
                        }
                    </ScrollView>
                </View>
                <ScrollView  stickyHeaderIndices={ [1] } refreshControl={
                    <RefreshControl
                        refreshing={ this.state.loading }
                        onRefresh={ this.onLoaging }
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }>
                    {
                        colors.map((color)=>{
                            return (
                                <View key={color} style={ {backgroundColor:color,height:100} }>

                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}