/**
 * Created by zhuzihao on 2017/8/2.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,Image,
    View,StackNavigator,TouchableOpacity,findNodeHandle,Animated,Dimensions
} from 'react-native';
import { Provider } from 'react-redux'
import Store from "./Sources/redux/Reducer"
import { UIManager} from 'NativeModules'
import {TabNavigator,DrawerNavigator ,DrawerItems} from "react-navigation"

console.disableYellowBox = true;
const TabNav = TabNavigator({
  homeMain:{screen:require("./Sources/Home/home").HomeNav},
  meetMain:{screen:require("./Sources/Meet/meet").MeetNav},
  newsMain:{screen:require("./Sources/News/news").NewsNav},
  settingMain:{screen:require("./Sources/Setting/setting").SettingNav},
},{
    tabBarComponent:require("./Sources/framework/TabBar").default,
    initialRouteName:"settingMain"
});
const Drawer = DrawerNavigator({
  sideMenu:{screen:TabNav},
  Setting:{
    getScreen:()=>{
      return require("./Sources/Setting/setting").Setting
    }
  }
},{
  contentComponent:(props)=>{
    return (
        <View>
          <DrawerItems {...props} onItemPress={({route})=>{
            props.navigation.navigate("DrawerClose");
            props.navigation.navigate(route.routeName);
          }}></DrawerItems>
        </View>
    );
  },
});

class HAPP extends Component{
  render(){
    return (
          <Provider store={ Store }>
            <Drawer>

            </Drawer>
          </Provider>

    );
  }
}

AppRegistry.registerComponent('HHH', () => HAPP);










