/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-03 14:31:38
 * @LastEditTime: 2019-12-03 14:55:41
 * @Author: 朱子豪
 * @Description: 
 */
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ConnectTouchable, TouchableType } from "./TouchableThrottle";
import { } from "./AppTouchable";
/**
 * TouchableNativeFeedback
 * TouchableHighlight
 * TouchableOpacity
 * TouchableWithoutFeedback
 * exam:
 *      <TouchableOpacity></TouchableOpacity>
 * 
 *      直接替换为
 *      <TouchableOpacityThrottle> 
 *      或者
 *      <TouchableOpacityThrottle throttleTime= {500} type = {"Debounce"} isThrottle= {true}>
 *      
 *      所有参数都是可选的 默认值见下
 * 
 * 
 * 说明 :
 *     开启远程 chrome 调试 定时器是不准确的
 *
 *  throttleTime:时间间隔
 *  type:Debounce | Throttle
 *  isThrottle:是否开启触发控制
 *  startAppThrottle:是否开启App全局节流
 */
export const TouchableType = TouchableType;

export const TouchableNativeFeedbackThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableNativeFeedback)
export const TouchableHighlightThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableHighlight)
export const TouchableOpacityThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableOpacity)
export const TouchableWithoutFeedbackThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableWithoutFeedback)


