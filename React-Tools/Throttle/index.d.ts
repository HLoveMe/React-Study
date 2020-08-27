/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-03 14:50:06
 * @LastEditTime: 2019-12-03 14:55:07
 * @Author: 朱子豪
 * @Description:
 */
import React, { Component } from "react";
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

export declare enum TouchableType {
  Throttle,
  Debounce
}

export interface ThrottleProps {
  throttleTime: Number;
  type: TouchableType;
  isThrottle: Boolean;
  startAppThrottle: Boolean;
}

export declare class TouchableNativeFeedbackThrottle<
  T extends ThrottleProps
> extends TouchableNativeFeedback {}

export declare class TouchableHighlightThrottle<
  T extends ThrottleProps
> extends TouchableHighlight {}

export declare class TouchableOpacityThrottle<
  T extends ThrottleProps
> extends TouchableOpacity {}

export declare class TouchableWithoutFeedbackThrottle<
  T extends ThrottleProps
> extends TouchableWithoutFeedback {}
