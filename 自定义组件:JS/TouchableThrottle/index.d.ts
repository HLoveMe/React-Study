/*
 * @Author: 爱上无名氏 
 * @Date: 2018-08-24 10:25:13 
 * @Last Modified by: 猪猪
 * @Last Modified time: 2018-08-24 12:05:41
 */


import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight,TouchableNativeFeedback ,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import hoistNonReactStatics from "hoist-non-react-statics";


export enum TouchableType{
    Throttle,
    Debounce
} 

export declare class TouchableNativeFeedbackThrottle extends Component{}
export declare class TouchableHighlightThrottle extends Component{}
export declare class TouchableOpacityThrottle extends Component{}
export declare class TouchableWithoutFeedbackThrottle extends Component{}