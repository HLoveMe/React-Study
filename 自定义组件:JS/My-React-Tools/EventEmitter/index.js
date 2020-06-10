/**
 * NativeEventEmitter 连接自己模块的通知
 *      new NativeEventEmitter(NativeModules.ToolsModule);
 * 
 * DeviceEventEmitter
 *      RN环境下注册接受通知
 * 
 * NativeAppEventEmitter
 *      警告⚠️ 毁弃API
 * 
 * 替代 DeviceEventEmitter
 */

/**
    创建事件 
    let event = EventTypeCenter.registerEvent("ABCD");
    注册监听
    let aa = EventEmitterCenter.registerReceiver(event,({data})=>{
        
    })
    注册第二个监听
    let bb = EventEmitterCenter.registerReceiver(event,({data})=>{
        
    })

    //事件派发
    EventEmitterCenter.emit("ABCDQ",{a:1,b:2})

    //移除事件监听
    aa.unsubscribe();
 * 
 */

/**
 * 
       let cc =  EventEmitterCenter.registerReceivers(EventTypeCenter.registerEvents(["A","B"]),({type,data})=>{
           debugger
       })
       EventEmitterCenter.emit("A",[1,2,3])
       EventEmitterCenter.emit("B","AAAAAAAAAAA")
       cc.unsubscribe()
 */

 /***
  * 
  *  * class CView extend Componet{
 *      eventGroup = null;
 *      constructor(ops){
 *          super(ops);
 *          this.eventGroup = EventEmitterCenter.createEventGroup(this,()=>{
 * 
 *          })
 *      }
 *      
 *      componentDidMount(){
 *           this.eventGroup.registerReceiver(xxx)
 *           this.eventGroup.registerReceiver(xxx)
 *           this.eventGroup.removeEvent(xxx)
 *      }
 *      componentWillUnmount(){
 *          //自动清理 eventGroup
 *      }
 * }
  * 
  */
 
 import { EventType, EventTypeCenter } from "./EventType";

 import { EventEmitterCenter } from "./EventEmitterCenter";
 import { EventGroup } from "./EventGroup";

const registerReceiver = function (event, handle) {
    let _event = typeof event == "string" ? EventTypeCenter.registerReceiver(event) : event;
    return EventEmitterCenter.registerReceiver(_event, handle)
}
const registerReceivers = function (events, handle) {
    let _events = events.map((event, index) => {
        return typeof event == "string" ? EventTypeCenter.registerReceiver(event) : event;
    })
    return EventEmitterCenter.registerReceivers(_events, handle)
}
const registerEvent = function (name) { return EventTypeCenter.registerEvent(name) }
const registerEvents = function (names) { return EventTypeCenter.registerEvents(names) }

const eventEmit = (events, data) => {
    [].concat(events).forEach(event => {
        EventTypeCenter.emit(typeof event == "string" ? event : event.name, data);
    })
}
export {
    EventType, EventTypeCenter, EventGroup, EventEmitterCenter,
    registerReceiver,
    registerReceivers,
    registerEvent,
    registerEvents,
    eventEmit
}