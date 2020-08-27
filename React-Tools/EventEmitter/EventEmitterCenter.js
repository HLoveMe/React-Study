
import { EventType, isEventType, EventTypeCenter } from "./EventType";
import { EventSubscription } from "./Subscription";
import { Subject } from "rxjs";
import { EventGroup } from "./EventGroup";

/**
 * 事件管理中心
 * 用于注册事件 
 * 派发事件
 */
class _EventEmitterCenter {
    eventContainer = new Subject();
    constructor() { }
    /**
     * 创建事件组 
     * 在组件释放后自动清除，组中所有事件
     * @param {*} component 以一个组件的生命周期为组
     * 
     */
    createEventGroup(component,handle) {
        if (handle == null) throw new Error("registerReceiver 需要两个回调方法");
        return new EventGroup(component,handle);
    }

    /**
     * 注册事件
     * @param {*} event 事件
     * @param {*} handle 处理函数 
     */
    registerReceiver(event, handle) {
        if (!isEventType(event)) throw new Error("registerReceiver event should isEventType");
        if (handle == null) throw new Error("registerReceiver 需要两个回调方法");
        let Ta = this.eventContainer.filter(({ type, data }) => { return type == event.name }).subscribe(({ type, data }) => {
            handle({ type, data })
        })
        event.count = 1 + event.count;
        return new EventSubscription([event], Ta);
    }
    /**
     * 注册多个事件
     * @param {*} event 事件  string | EventType
     * @param {*} handle 处理函数 
     */
    registerReceivers(events, handle) {
        if (handle == null) throw new Error("registerReceiver 需要两个回调方法");
        if (!Array.isArray(events)) throw new Error("registerReceiver 第一个参数必须是数组");
        let names = [];
        for (let index = 0; index < events.length; index++) {
            let event = events[index];
            if (isEventType(event)) {
                names.push(event.name);
                event.count = 1 + event.count;
            } else {
                console.warn("EventEmitterCenter registerReceivers " + event + " not is EventType")
            }
        }
        let Ta = this.eventContainer.filter(({ type, data }) => { return names.indexOf(type) >= 0 }).subscribe(({ type, data }) => {
            handle({ type, data })
        })
        return  new EventSubscription(events, Ta);
    }
    /**
     * 派发事件
     * @param {*} event  string | EventType
     * @param {*} data 
     */
    emit(event, data,showWarn = true) {
        // debugger
        if (!isEventType(event) && !EventTypeCenter.hasRegister(event)) {
            // showWarn && console.warn(`EventEmitterCenter emit first argment 'event' of '${event}' illegal`)
            return
        }
        let type = isEventType(event) ? event.name : event;
        return this.eventContainer.next({ type, data })
    }
}


export const EventEmitterCenter = new _EventEmitterCenter();

