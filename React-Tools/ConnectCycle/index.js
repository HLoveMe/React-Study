/*
 * @Creator: 朱子豪 
 * @Date: 2018-11-19 14:23:51 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-04-29 10:13:00
 * @Desc:  连接生命周期
 */


import React, { Component } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

const BackResult = { data: {} };

export default function (WrappedComponent) {
    if (WrappedComponent.prototype.addExtraProps) {
        const addExtraProps = WrappedComponent.prototype.addExtraProps
        WrappedComponent.prototype.addExtraProps = function (...args) {
            return {
                ...addExtraProps.bind(this)(...args),
                ref: this.setWrappedInstance
            }
        }
        const getWrappedInstance = WrappedComponent.prototype.getWrappedInstance
        WrappedComponent.prototype.getWrappedInstance = function (...args) {
            return this.wrappedInstance
        }
    }

    class ConnectComponentLife extends Component {
        constructor(ops) {
            super(ops)
            this.state = { props: ops }
        }
        extraProps(props) {
            return {
                ...props,
                style: {
                    ...props.style,
                    flex: 1
                }
            }
        }
        //得到组件对象
        getPageInstance() {
            return (this._wrapcomponent && this._wrapcomponent.getWrappedInstance) ? this._wrapcomponent.getWrappedInstance() : this._wrapcomponent
        }
        componentWillMount() {
            this.didFocusSubscription = this.props.navigation.addListener(
                'didFocus',
                payload => {
                    if (this._didFocus == null) {
                        this._didFocus = true;
                        let screen = this.getPageInstance();
                        screen && screen.componentDidAppear && screen.componentDidAppear()
                    }
                }
            );
            this.didBlurSubscription = this.props.navigation.addListener(
                'didBlur',
                payload => {
                    if (this._didBlur == null) {
                        this._didBlur = true;
                        let screen = this.getPageInstance();
                        screen && screen.componentDidUnAppear && screen.componentDidUnAppear()
                    }
                }
            );
            this.willBlurSubscription = this.props.navigation.addListener(
                'willBlur',
                payload => {
                    let screen = this.getPageInstance();
                    screen && screen.componentViewWillUnAppear && screen.componentViewWillUnAppear()
                }
            );

            this.willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                payload => {
                    let screen = this.getPageInstance();
                    screen && screen.componentViewWillAppear && screen.componentViewWillAppear(BackResult.data)
                    BackResult.data = {};
                }
            );
        }
        /**
         * 得到当前页面对象
         * @param {*} Com 
         */
        getSourceComponent = (Com) => {
            if (Com.WrappedComponent) {
                return this.getSourceComponent(Com.WrappedComponent)
            } else {
                return Com
            }
        }
        componentWillUnmount() {
            this.didFocusSubscription && this.didFocusSubscription.remove()
            this.didBlurSubscription && this.didBlurSubscription.remove()
            this.willBlurSubscription && this.willBlurSubscription.remove()
            this.willFocusSubscription && this.willFocusSubscription.remove()
        }
        componentWillReceiveProps(newP, oldP) {
            if (newP !== oldP) { this.setState({ props: newP }); }
        }
        // goBack(_goBack) {
        //     return (...args) => {
        //         if (args.length >= 1)
        //             BackResult.data = args.pop()
        //         return _goBack(...args)
        //     }
        // }
        // pop(_pop) {
        //     return (...args) => {
        //         if (args.length >= 1)
        //             BackResult.data = args.pop()
        //         return _pop(...args)
        //     }
        // }
        // popToTop(_popToTop) {
        //     return (...args) => {
        //         if (args.length >= 1)
        //             BackResult.data = args.pop()
        //         return _popToTop(...args)
        //     }
        // }
        navigation = (navigate) => {
            return (...args) => {
                if (args.length >= 1)
                    BackResult.data = args.pop()
                return navigate(...args)
            }
        }
        render() {
            let props = this.extraProps(this.state.props)
            props.navigation.goBack = this.navigation(props.navigation.goBack)
            props.navigation.pop = this.navigation(props.navigation.pop)
            props.navigation.popToTop = this.navigation(props.navigation.popToTop)
            return (<WrappedComponent {...props} ref={ref => { this._wrapcomponent = ref }}></WrappedComponent>)
        }
    }
    ConnectComponentLife.WrappedComponent = WrappedComponent
    ConnectComponentLife.displayName = `AddComponentLife${WrappedComponent.displayName}`
    return hoistNonReactStatics(ConnectComponentLife, Component)
}
