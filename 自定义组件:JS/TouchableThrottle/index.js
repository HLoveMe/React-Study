/*
 * @Author: 爱上无名氏 
 * @Date: 2018-08-24 10:25:13 
 * @Last Modified by: 猪猪
 * @Last Modified time: 2018-08-24 11:44:26
 */

import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight,TouchableNativeFeedback ,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import hoistNonReactStatics from "hoist-non-react-statics";

class ThrottleTask {
    throttle = 0
    timer = null
    constructor(time = 1000) {
        this.throttle = Math.abs(time)
    }
    start() {
        this.timer = setTimeout(this.end.bind(this), this.throttle)
    }
    end() {
        if (this.timer != null) {
            clearTimeout(this.timer)
            this.timer = null;
        }
    }
    isRuning() {
        return this.timer != null;
    }
}

export const TouchableType = {
    Throttle: "Throttle",
    Debounce: "Debounce"
}

function ConnectTouchable(config = {}) {
    return function (WrapComponent) {
        class TouchableThrottle extends Component {
            throttleTask = null;
            constructor(props) {
                super(props);
                this.state = {
                    throttle: this.props.throttle || config.throttle || 1000,
                    type: this.props.type || config.type || TouchableType.Throttle,
                    isthrottle:this.props.isthrottle || config.isthrottle || true
                }
                this.throttleTask = new ThrottleTask(this.state.throttle)
            }
            componentWillReceiveProps(nP,op){
                this.setState({
                    type:nP.type,
                    isthrottle:nP.isthrottle
                });
            }
            reStartTask() {
                this.throttleTask.end()
                this.throttleTask.start()
            }
            onPress = (...args) => {
                if(!this.state.isthrottle){this.props.onPress && this.props.onPress(...args)}
                if (this.throttleTask.isRuning()) {
                    if (this.state.type == TouchableType.Debounce)
                        this.reStartTask()
                    return
                } else {
                    this.reStartTask()
                    this.props.onPress && this.props.onPress(...args)
                }
            }
            componentWillUnmount() {
                this.throttleTask.end()
                this.throttleTask = null;
            }
            render() {
                return (
                    <WrapComponent {...this.props} onPress={this.onPress}>
                        {
                            this.props.children
                        }
                    </WrapComponent>
                )
            }
        }
        TouchableThrottle.defaultProps = {
            throttle: 500,
            type: TouchableType.Throttle,
            isthrottle:true
        }
        TouchableThrottle.propTypes = {
            throttle: PropTypes.number,
            type: PropTypes.string,
            isthrottle:PropTypes.bool
        }

        TouchableThrottle.WrappedComponent = WrapComponent
        TouchableThrottle.displayName = `Throttle${WrapComponent.displayName}`
        return hoistNonReactStatics(TouchableThrottle, WrapComponent)
    }
}

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
 *      <TouchableOpacityThrottle throttle= {500} type = {"Debounce"} isthrottle= {true}>
 *      
 *      所有参数都是可选的 默认值见下
 * 
 * 
 * 说明 :
 *     开启远程 chrome 调试 定时器是不准确的
 *
 *  throttle:时间间隔
 *  type:Debounce | Throttle
 *  isthrottle:是否开启触发控制
 */
export const TouchableNativeFeedbackThrottle = ConnectTouchable({ throttle: 500, type: TouchableType.Throttle ,isthrottle:true})(TouchableNativeFeedback)
export const TouchableHighlightThrottle = ConnectTouchable({ throttle: 500, type: TouchableType.Throttle,isthrottle:true })(TouchableHighlight)
export const TouchableOpacityThrottle = ConnectTouchable({ throttle: 500, type: TouchableType.Throttle ,isthrottle:true})(TouchableOpacity)
export const TouchableWithoutFeedbackThrottle = ConnectTouchable({ throttle: 500, type: TouchableType.Throttle,isthrottle:true })(TouchableWithoutFeedback)
