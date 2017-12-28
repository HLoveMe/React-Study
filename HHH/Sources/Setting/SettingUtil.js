/**
 * Created by zhuzihao on 2017/8/17.
 */


var EventEmitter = require('events').EventEmitter;
class SettingUtil{
    events = {};
    constructor(){}
    SettingAddListener(name,call){
        var event = this.events[name];
        if(event == null){
            event =  new EventEmitter();

            this.events[name]=event;
        }
        event.on(name,call);
    }
    SettingRemoveListener(name){
        var event = this.events[name];

        event && event.removeAllListeners(name);
    }
    SettinEemit(name,data){
        var event = this.events[name];
        event && event.emit(name,data)
    }
}
export const  EventUtil = SettingUtil();