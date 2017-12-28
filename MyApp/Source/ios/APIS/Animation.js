/**
 * Created by zhuzihao on 2017/7/29.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,Button,ScrollView,Animated
} from 'react-native';

const styles = StyleSheet.create({
    ani:{
        padding:10,
        margin:10,
        backgroundColor:'green',
        height:80
    },
    text:{
        textAlign:"center",
        height:30,
        lineHeight:30
    }
})
const AnimationButton = Animated.createAnimatedComponent(Button);
export default class AnimationVC extends Component{
    view = null;
    constructor(ops){
        super(ops);
        this.state={
            fain:new Animated.Value(0.2),
            size:new Animated.Value(14),
            weizi:new Animated.ValueXY({x:100,y:160}),


            size2:new Animated.Value(15),
            rotate:new Animated.Value(10),
            scaleX:new Animated.Value(0.5)
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            Animated.timing(this.state.fain,{
                toValue:0.8,
                duration:3000,
                useNativeDriver:true
            }).start();

        },1000);
        setTimeout(()=>{
            Animated.timing(this.state.size,{
                toValue:20,
                duration:2000,
            }).start();

        },1000);
        setTimeout(()=>{
            Animated.timing(this.state.weizi,{
                toValue:{x:0,y:0} ,
                duration:2000,
            }).start();

        },1000);
        setTimeout(()=>{
            Animated.sequence([
                Animated.timing(this.state.rotate,{
                    toValue:360,
                    duration:3000
                }),
                Animated.timing(this.state.scaleX,{
                    toValue:1,
                    duration:3000
                }),
                Animated.delay(1000)
                ,
                Animated.timing(this.state.size2,{
                    toValue:25
                })
            ]).start()
        },1000);
    }
    render(){
        return (
            <View>
                <Animated.View ref={ view=>this.view=view } style={ [styles.ani,{
                    opacity:this.state.fain
                }] }>

                </Animated.View>
                <Animated.Text
                    style={ [styles.text,{fontSize:this.state.size}] }
                >
                    朱子豪
                </Animated.Text>
                <Animated.Text style={ [{backgroundColor:'yellow',fontSize:this.state.size2,transform:[
                    {
                        rotate:this.state.rotate.interpolate({
                            inputRange:[0,360],
                            outputRange:["0deg","360deg"]
                        })
                    },{
                        scaleX:this.state.scaleX
                    }
                ]}] }>
                                  transform
                </Animated.Text>
                <Animated.View style={ [this.state.weizi.getLayout(),{backgroundColor:'red',position:"absolute",width:200,height:44}] }>

                </Animated.View>
            </View>

        );
    }
}