/**
 * Created by zhuzihao on 2017/7/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,Modal
} from 'react-native';

const  styles =  StyleSheet.create({
    constainer:{
        fontSize:15,
        color:'red',
        width:100,
        textAlign:'center'
    },
    my:{
        fontWeight:'bold',
    }

})
export  default class TextView extends Component{
    render(){
        return (
            <View style={ {overflow:'hidden',display:'flex'} } >
                <Text numberOfLines={ 4 } style={{paddingTop:10}}>
                    By default, Nuclide does not install all of the recommended Atom packages that enhance the Nuclide experience. This was done purposely in order to ensure that users have to opt-in to some features rather than obtrusively modify their work environment.
                    Recommended packages include:
                    tool-bar to enable the N
                    <Text style={{paddingTop:10,margin:20}}>
                        uclide toolbar.
                        sort-lines to enable sorting lines of text.
                        language-ocaml to enable OCaml language syntax highlighting.
                        language-babel to enable language grammar for JS, Flow and React JS, etc.
                        …and others under package-deps.
                    </Text>
                </Text>
                <Text style={ styles.constainer }>
                        你个大苏北a
                    <Text style={styles.my}>
                        二笔
                    </Text>
                </Text>
                <Text ref="testT" onLongPress={()=>{

                }} onPress={()=>{
                    console.log(this.refs.testT)

                }} suppressHighlighting={false} selectable={ true }>
                    你十一大大大大sasas阿萨飒飒
                    <MYHeaderText style={ {color:'red'} }>ASAS</MYHeaderText>
                    <Text style={{width:100,height:100}}>ABCD</Text>
                </Text>

            </View>
        );
    }
}

class MYHeaderText extends Component{
    styles =  StyleSheet.create({
        text:{
            fontSize:33,
            color:'green',
            fontWeight:"bold"
        }
    })
    render(){
        return (
            <Text {...this.props} style={ [this.styles.text,this.props.style]} >

            </Text>
        );
    }
}