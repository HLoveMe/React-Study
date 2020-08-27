const EventName = "EventType"

/**
 * 事件  必须使用类型进行注册
 */
export class EventType {
    name = null;
    //事件在集合的位置
    index = -1;
    //绑定的处理函数个数
    count = 0
    constructor(name, index) {
        this.name = name || EventName;
        this.index = index;
    }
    /**
     * 判断该类型是否初始化
     * 是否有效
     */
    isValid() {
        return this.name != EventName
    }
}

/**
 * 判断是否为有效的 EventType 对象
 * @param {*} obj 
 */
export function isEventType(obj) {
    if (obj instanceof EventType) {
        return obj.isValid()
    }
    return false;
}

class _EventTypeCenter {
    types = []
    constructor() { }
    /**
     * 注册事件
     * @param {*} name 
     */
    registerEvent(name) {
        if(!(typeof name == "string"))throw new Error("EventTypeCenter registerEvent argments should string")
        return new EventType(name, this.types.push(name))
    }
    /**
     * 注册多个事件
     * @param {*} names 
     */
    registerEvents(names) {
        if (Array.isArray(names)) {
            return names.map(name => this.registerEvent(name))
        }
        throw new Error("registerEvents should is Array")
    }
    /**
     * 检查是否包含事件
     * @param {*} event 
     */
    hasRegister(event) {
        let type = typeof event == "string" ? event : event.type
        return this.types.indexOf(type) >= 0;
    }
    /**
     * 移除事件
     * @param {*} event 
     */
    removeEvent(event) {
        if (isEventType(event)) {
            let index = event.index;
            event.count = event.count - 1;
            index >= 0 && event.count == 0 && this.types.splice(index - 1, 1, "_None")
        }
    }
}

export const EventTypeCenter = new _EventTypeCenter();