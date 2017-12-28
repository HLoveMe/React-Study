import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,PanResponder,TouchableHighlight,TouchableOpacity
} from 'react-native';


export  default class ButtonComponent extends Component{
    constructor(options){
        super(options)
    }

    sendData(evt){
        alert(1)
    }
    sendData2 = ()=>{
        alert(222)
        this.refs.button.setDisable(true)
    }
    render(){
        return (
            <View>
                <Button style={ {color:'red',borderWidth:1,borderColor:'red',backgroundColor:'yellow',width:100,height:44} } disabled={ false } title={ 'Press Me' } onPress={ this.sendData }>

                </Button>
                <MyButton1 onPress={ this.sendData } style={ { width:100,height:30,backgroundColor:'red',borderRadius:15 } } textStyle={ {color:'yellow'} } text="确定"></MyButton1>
                <MyButton2 ref="button" onPress={ this.sendData2 } style={ { width:200,height:30,backgroundColor:'blue',borderRadius:15 } } text="取消"></MyButton2>
            </View>

        );
    }

}
const  styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        overflow:'hidden',
    },
    buttonText:{
        color:'black',
        textAlign:'center'
    },
    buttonDisable:{
        backgroundColor:'gray'
    }
});
export class MyButton1 extends Component{
    /**
     *  text : 文本
     *  textStyle:文本css
     *  style:按钮外观
     *  onPress 触发事件
     *
     * */
    constructor(options) {
        super(options)
    }
    onPressEvent = (e) =>{
        const { onPress } =  this.props;
        if(onPress){
            onPress(e);
        }
    };
    render(){
        return (
            <TouchableOpacity activeOpacity={ 0.7 } onPress={ this.onPressEvent } style= { [styles.button,this.props.style] }  >
                <Text style={ [styles.buttonText, this.props.textStyle] }>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
MyButton1.defaultProps={
    text:"ABCD"
};

MyButton1.propTypes = {
    text:React.PropTypes.string
}
export class MyButton2 extends Component{
    constructor(options){
        super(options)
        this.state={
            disable:false
        }
    }

    setDisable = (disable)=>{
        this.setState({
            disable:disable
        })
    }
    onPressEvent = (e) =>{
        const { onPress } =  this.props;
        onPress(e)
    };
    render(){
        return (
            <TouchableHighlight disabled={this.state.disable} onPress={ this.onPressEvent } style= { [styles.button,this.props.style,this.state.disable&&styles.buttonDisable] }  >
                <Text style={ [styles.buttonText, this.props.textStyle] }>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}