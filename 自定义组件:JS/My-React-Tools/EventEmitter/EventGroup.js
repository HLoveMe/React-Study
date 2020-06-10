/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-03 14:31:34
 * @LastEditTime: 2019-12-04 14:51:42
 * @Author: 朱子豪
 * @Description: 
 */

import React, { Component, PureComponent } from "react";

/**
 * 事件组
 * 
 */
export class EventGroup {
    eventListener = []
    handle = null;
    constructor(component, handle) {
        this.handle = handle;
        if (component && (component instanceof Component || component instanceof PureComponent)) {
            const Unmount = component.componentWillUnmount;
            let _this = this;
            component.componentWillUnmount = function (...args) {
                _this.eventListener.map((listener) => {
                    listener && listener.unsubscribe && listener.unsubscribe()
                })
                return Unmount && Unmount.bind(component)(...args)
            }
            return
        } else
            throw new Error("EventGroup should init use React.Component")

    }
    /***
     * @event String | EventType
     */
    registerReceiver(event) {
        let len = this.eventListener.length;
        const { EventEmitterCenter } = require("./EventEmitterCenter");
        let _event = typeof event == "string" ? require("./EventType").EventTypeCenter.registerEvent(event) : event;
        this.eventListener[len] = EventEmitterCenter.registerReceiver(_event, this._handle)
    }
    /**
     * 移除事件
     * @param {*} event String | EventType
     */
    removeEvent(event) {
        let _index = -1;
        for (let index = 0; index < this.eventListener.length; index++) {
            let listener = this.eventListener[index];
            if (typeof event == "string") {
                if (listener.events[0].name == event) {
                    listener.remove();
                    _index = index;
                    break;
                }
            } else {
                if (listener.events[0] == event) {
                    listener.remove();
                    _index = index;
                    break;
                }
            }

        }
        if (_index != -1) {
            this.eventListener[_index] = null;
        }
    }
    _handle = (options) => {
        this.handle && this.handle(options)
    }
}