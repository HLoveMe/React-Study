import React, { Component, PureComponent } from 'react';
/**
 * 处理函数参数类型
 */
export declare interface Result {
    type: String;
    data: Any?
}
/**
 * 事件回调函数
 */
export declare type EventHandle = (result: Result) => {}
/**
 * 事件类型 注册必须使用该类型
 * 
 */
export declare interface EventType {
    name: String
}
/**
 * 事件组 所有事件周期和绑定的组件事件周期一致
 * 会在组件销毁时；自动销毁所有关联事件
 */
export declare interface EventGroup {
    /**
     * 在组中注册事件
     * @param event 事件
     */
    registerReceiver(event: String | EventType): Void;
    /**
     * 移除相关事件注册
     * @param event 
     */
    removeEvent(event: String | EventType): Void
}
/**
 * 针对事件管理者
 * 事件类型必须用该类 生成
 */
declare class _EventTypeCenter {
    /**
     * 注册一个事件
     * @param name 事件名
     */
    registerEvent(name: String): EventType;
    /**
     * 注册一个事件s
     * @param names 事件名s
     */
    registerEvents(names: String[]): EventType[];
    /**
     * 判断是否已经注册该事件名
     * @param event 
     */
    hasRegister(event: String | EventType): boolean;
    /**
     * 移除该事件 无法接受
     * @param event 
     */
    removeEvent(event: EventType): Void;
}
export const EventTypeCenter: _EventTypeCenter;

/**
 * 事件释放者
 */
export declare interface EventSubscription {
    //remove == unsubscribe
    /**
     * 移除事件 不在接受事件派发
     */
    remove(): void;
    /**
     * 移除事件 不在接受事件派发
     */
    unsubscribe(): void;
}
/**
 * 事件管理者 用于注册 和 派发事件
 */
declare class _EventEmitterCenter {
    /**
     * 对事件进行注册
     * @param event 事件
     * @param handle 回调
     */
    registerReceiver(event: EventType, handle: EventHandle): EventSubscription;
    /**
     * 对多个事件进行注册
     * @param events 事件s
     * @param handle 回调
     */
    registerReceivers(events: EventType[], handle: EventHandle): EventSubscription;

    /**
     * 创建一个事件集合
     * @param component 组件对象
     * @param handle 处理函数
     */
    createEventGroup(component: Component | PureComponent, handle: EventHandle): EventGroup;

    /***
     * 派发任务
     */
    emit(event: String | EventType, data: any): void;
}

export const EventEmitterCenter: _EventEmitterCenter;

//简便函数
export declare type registerReceiver = (event: EventType | String, handle: EventHandle) => EventSubscription
export declare type registerReceivers = (events: EventType[] | String[], handle: EventHandle) => EventSubscription
export declare type registerEvent = (name: String) => EventType;
export declare type registerEvents = (names: String[]) => EventType[];
export declare type eventEmit = (event:String | String[] | EventType | EventType[],data:Any)=>void;






