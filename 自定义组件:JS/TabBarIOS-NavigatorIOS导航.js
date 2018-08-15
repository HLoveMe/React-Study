/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,NavigatorIOS,TabBarIOS
} from 'react-native';

class TestView extends Component{
  render(){
    return (
        <View style={{flex:1}}>

        </View>
    );
  }
}

class Home extends  Component{
  render(){
    return (
        <NavigatorIOS style={{flex:1}} initialRoute={
        {
          component:TestView,
          title:'AS',
          rightButtonTitle:"朱子豪",
          onRightButtonPress:()=>{

          }
        }
        }>

        </NavigatorIOS>
    );
  }
}
class Meet extends  Component{
  constructor(ops){
    super(ops)
  }
  render(){
    return (
        <NavigatorIOS style={{flex:1}} initialRoute={
        {
          component:TestView,
          title:'Meet'
        }
        }>

        </NavigatorIOS>
    );
  }
}
class News extends  Component{
  render(){
    return (
        <NavigatorIOS style={{flex:1}} initialRoute={
        {
          component:TestView,
          title:'News'
        }
        }>

        </NavigatorIOS>
    );
  }
}
class Setting extends  Component{
  render(){
    return (
        <NavigatorIOS style={{flex:1}} initialRoute={
        {
          component:TestView,
          title:'Setting'
        }
        }>

        </NavigatorIOS>
    );
  }
}
export default class APP extends Component {
  constructor(ops){
    super(ops)
    this.state={
      current:'home'
    }
  }
  render() {
    return (
        <TabBarIOS
            barTintColor="green"
            tintColor="red"
  unselectedItemTintColor="yellow"
        >
          <TabBarIOS.Item
              title="Home"
              style={ {} }
              selected={ this.state.current == 'home' }
              onPress={
                ()=>{
                  this.setState({current:'home'})
                }
              }

          >
            <Home></Home>   页面
          </TabBarIOS.Item>
          <TabBarIOS.Item
              title="Meet"
              selected={ this.state.current == 'meet' }
              onPress={
                ()=>{
                  this.setState({current:'meet'})
                }
              }
          >
            <Meet></Meet>   页面
          </TabBarIOS.Item>
          <TabBarIOS.Item
              title="News"
              selected={ this.state.current == 'news' }
              onPress={
                ()=>{
                  this.setState({current:'news'})
                }
              }
          >
            <News></News>
          </TabBarIOS.Item>
          <TabBarIOS.Item
              title="Setting"
              selected={ this.state.current == 'setting' }
              onPress={
                ()=>{
                  this.setState({current:'setting'})
                }
              }
          >
            <Setting></Setting>   页面
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('HWMbbf', () => APP);
