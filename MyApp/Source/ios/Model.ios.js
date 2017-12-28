/**
 * Created by zhuzihao on 2017/7/21.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,Modal
} from 'react-native';
import { MyButton1 } from "./Button.ios"
const  styles =  StyleSheet.create({
   button:{
       width:100,
       height:44,
       borderRadius:22,
       backgroundColor:"red",
       position:"absolute",
       left:'50%',
       top:'50%',
       marginLeft:-50,
       marginTop:-22
   },
    view:{
        width:'100%',
        height:'100%',
        backgroundColor:'green',
        position:'relative'
    },
    Modalcontainer:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        justifyContent:'center'
    },
    ModalContent:{
        margin:20,
        padding:20,
        height:150,
        borderRadius:20,
        backgroundColor:'white',
        position:'relative'
    },
    ModalContentButton:{
        width:60,
        height:40,
        position:'absolute',
        left:'50%',
        marginLeft:-10,//  30 - 20
        bottom:20,
        backgroundColor:'red'
    }
});
export default class ModelC  extends Component{
    constructor(options){
        super(options)
        this.state={
            show:false
        }
    }
    render() {
        return (
            <View style={ styles.view }>
                <View style={ {width:100,height:100,backgroundColor:'yellow',marginLeft:0,marginTop:10} }>

                </View>
                <MyButton1 /**text="show"*/ onPress={()=>{
                    this.setState({
                        show:true
                    })
                }} style={ styles.button }></MyButton1>
                <Modal visible={ this.state.show } transparent={ true } animationType="fade" >
                        <View style={ styles.Modalcontainer }>
                            <View style={styles.ModalContent}>
                                 <Text style={ {fontSize:17} }>
                                     请问你是一个大傻逼吗,请不要相信你的选择!!!
                                 </Text>
                                <MyButton1 style={ [styles.ModalContentButton]} text="Sure" onPress={
                                    ()=>{
                                        this.setState({
                                            show:false
                                        })
                                    }
                                }>

                                </MyButton1>
                            </View>
                        </View>
                </Modal>
            </View>
        );
    }
}