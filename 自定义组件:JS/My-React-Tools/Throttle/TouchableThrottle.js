/*
 * @Author: 爱上无名氏 
 * @Date: 2018-08-24 10:25:13 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-08-07 10:55:23
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from "hoist-non-react-statics";
import { } from "./AppTouchable";
import MayTouch from "./utils/timeChange";
class ThrottleTask {
    throttle = 0;
    _last = (new Date()).getTime();
    constructor(time = 1000) {
        this.throttle = Math.abs(time)
        this.reStart()
    }
    reStart() {
        this._last = (new Date()).getTime();
    }
    isRuning() {
        if (MayTouch(this._last)) return false;
        return (new Date()).getTime() - this._last < this.throttle
    }
}

export const TouchableType = {
    Throttle: "Throttle",
    Debounce: "Debounce"
}
export function ConnectTouchable(config = {}) {
    return function (WrapComponent) {
        class TouchableThrottle extends Component {
            throttleTask = null;
            constructor(props) {
                super(props);
                this.state = {
                    //节流时间
                    throttleTime: this.props.throttleTime || config.throttleTime || 1000,
                    //节流类型
                    type: this.props.type || config.type || TouchableType.Throttle,
                    //是否节流
                    isthrottle: this.props.isThrottle,
                    //是否接受 全局节流
                    startAppThrottle: this.props.startAppThrottle,
                }
                if (this.state.isthrottle)
                    this.throttleTask = new ThrottleTask(this.state.throttleTime)
            }
            componentWillReceiveProps(nP, op) {
                this.setState({
                    type: nP.type,
                    isthrottle: nP.isThrottle
                });
            }
            reStartTask() {
                this.throttleTask.reStart()
            }
            onPress = (...args) => {
                if (!this.state.isthrottle) { this.props.onPress && this.props.onPress(...args); return; }
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
                this.throttleTask = null;
            }
            _onLayout = (event) => {
                this.props.onLayout && this.props.onLayout(event)
            }
            _getDevStyle = () => {
                return this.props.style;
            }
            render() {
                return (
                    <WrapComponent {...this.props} style={this._getDevStyle()} onPress={this.onPress} isThrottle={this.state.startAppThrottle} onLayout={this._onLayout}>
                        {
                            this.props.children
                        }
                    </WrapComponent>
                )
            }
        }
        TouchableThrottle.defaultProps = {
            throttleTime: 500,
            type: TouchableType.Throttle,
            isThrottle: true
        }
        TouchableThrottle.propTypes = {
            throttleTime: PropTypes.number,
            type: PropTypes.string,
            isThrottle: PropTypes.bool
        }

        TouchableThrottle.WrappedComponent = WrapComponent
        TouchableThrottle.displayName = `Throttle${WrapComponent.displayName}`
        return hoistNonReactStatics(TouchableThrottle, WrapComponent)
    }
}

