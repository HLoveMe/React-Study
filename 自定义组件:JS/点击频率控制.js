import React, { Component } from 'react';
//TouchableWithoutFeedback <-  TouchableHighlight
//TouchableWithoutFeedback <-  TouchableOpacity
//TouchableWithoutFeedback <- TouchableNativeFeedback

/***
 * 
 * 
 * 统一修改  touchableHandlePress
 */


import { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Subject } from 'rxjs';
(function () {
    const oldComponentDidMount = TouchableWithoutFeedback.prototype.componentDidMount
    TouchableWithoutFeedback.prototype.componentDidMount = function (...args) {
        if (this.props.onPress && this.props.throttleTime && this.props.throttleTime >= 0) {
            this.__onPressSub = new Subject();
            let throttleTime = this.props.throttleTime || 250;
            this.__onPressR = this.__onPressSub.throttleTime(throttleTime).subscribe((_args) => {
                _this = _args.pop();
                this.props.onPress && this.props.onPress.bind(_this)(..._args);
            })
            this.touchableHandlePress = function (...args) {
                this.__onPressSub && this.__onPressSub.next && this.__onPressSub.next(args.concat(this))
            }.bind(this)
        }
        return oldComponentDidMount.bind(this)(...args)
    }

    const oldComponentWillUnmount = TouchableWithoutFeedback.prototype.componentWillUnmount
    TouchableWithoutFeedback.prototype.componentWillUnmount = function (...args) {
        this.__onPressR && this.__onPressR.unsubscribe()
        this.__onPressSub = null;
        return oldComponentWillUnmount.bind(this)(...args)
    }
}());
(function () {
    const oldComponentDidMount = TouchableOpacity.prototype.componentDidMount
    TouchableOpacity.prototype.componentDidMount = function (...args) {
        if (this.props.onPress && this.props.throttleTime && this.props.throttleTime >= 0) {
            this.__onPressSub = new Subject();
            let throttleTime = this.props.throttleTime || 250;
            this.__onPressR = this.__onPressSub.throttleTime(throttleTime).subscribe((_args) => {
                _this = _args.pop();
                this.props.onPress && this.props.onPress.bind(_this)(..._args);
            })
            this.touchableHandlePress = function (...args) {
                this.__onPressSub && this.__onPressSub.next && this.__onPressSub.next(args.concat(this))
            }.bind(this)
        }
        return oldComponentDidMount.bind(this)(...args)
    }

    const oldComponentWillUnmount = TouchableOpacity.prototype.componentWillUnmount
    TouchableOpacity.prototype.componentWillUnmount = function (...args) {
        this.__onPressR && this.__onPressR.unsubscribe()
        this.__onPressSub = null;
        return oldComponentWillUnmount.bind(this)(...args)
    }
}());

(function () {
    const oldComponentDidMount = TouchableHighlight.prototype.componentDidMount
    TouchableHighlight.prototype.componentDidMount = function (...args) {
        if (this.props.onPress && this.props.throttleTime && this.props.throttleTime >= 0) {
            this.__onPressSub = new Subject();
            let throttleTime = this.props.throttleTime || 250;
            this.__onPressR = this.__onPressSub.throttleTime(throttleTime).subscribe((_args) => {
                _this = _args.pop();
                this.props.onPress && this.props.onPress.bind(_this)(..._args);
            })
            this.touchableHandlePress = function (...args) {
                this.__onPressSub && this.__onPressSub.next && this.__onPressSub.next(args.concat(this))
            }.bind(this)
        }

        return oldComponentDidMount.bind(this)(...args)
    }

    const oldComponentWillUnmount = TouchableHighlight.prototype.componentWillUnmount
    TouchableHighlight.prototype.componentWillUnmount = function (...args) {
        this.__onPressR && this.__onPressR.unsubscribe()
        this.__onPressSub = null;
        return oldComponentWillUnmount.bind(this)(...args)
    }
}())