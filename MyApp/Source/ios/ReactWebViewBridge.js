/**
 * Created by zhuzihao on 2017/7/25.
 */
'use strict';
import { WebView } from 'react-native';
// const React = require('React');
// const PropTypes = React.PropTypes;

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");;
}
const  MESSAGE_SPACE = 100;
var last = 0;
class Task{
    id = null;
    handle = null;//回调
    // create = new Date().getTime();
    constructor(id,hanle){
        this.id=id;
        this.handle = hanle;
    }
}
class  MessageTransmit{
    webView = null;//web
    protocol = null;//类型
    tasks = {};//任务
    handle = null; //消息处理器
    constructor(protocol,web,handle){
        this.webView = web;
        this.protocol = protocol;
        this.handle=handle;
    }
    /**
     *  message 发送的消息
     *  handle = function(status,data){
     *
     *  }
     * */
    //发送消息
    send=(message,handle)=>{
        var id=uuid();
        var info = {
            id:id,
            protocol:this.protocol,
            data:message
        };
        if(this.webView){
            var task = new Task(id,handle);
            this.tasks[id] = task;
            this._send(JSON.stringify(info));
        }
    };
    //接收消息回复
    _dispense=(result)=>{
        /**
         *{
                 *  id:ID,
                 *  protocol:XX
                 *  status:1/0   有无表示是否为信息或者为回复
                 *  data:obj     回复时 没有
                 * }
         * */
        var id  = result["id"];
        var task = this.tasks[id];
        if(task.handle){
            task.handle(result['status'],result["reason"]);
        }
        delete this.tasks[id];
    };
    //回复信息接收状态
    _revert = (result,res)=>{
        delete  result["data"];
        result["status"] = (res != false);
        this._send(JSON.stringify(result));

    }

    _send=(data)=>{
        var newD = new Date().getTime();
        if(last == 0 || (newD - last) >= MESSAGE_SPACE){
            this.webView.postMessage(data);
            last = newD;
        }else{
            setTimeout(()=>{
                this.webView.postMessage(data);
            },MESSAGE_SPACE-(newD-last));
            last = last+MESSAGE_SPACE;
        }
    }
}

class ReactWebViewBridge{
    transmits = {};
    webView = null;//网页
    timer =null;
    //注册 消息处理器
    constructor(){
        // var time = 1000*60*5;//五分钟检查一次
        // this.timer = setInterval(()=>{
        //     var date = new Date().getTime();
        //     for(var protocol in this.transmits){
        //         var trans = this.transmits[protocol];
        //         var ids = [];
        //         for(var id in trans.tasks){
        //             var task = trans.tasks[id];
        //             var create = task.create;
        //             if(date-create>=time){
        //                 ids.push(id);
        //             }
        //         }
        //         for(var _id in ids ){
        //             delete  trans.tasks[_id];
        //         }
        //     }
        // },time);
    }
    register = (protocol,web,handle)=>{
        if(protocol != null && protocol.length >=1){
            if(this.transmits[protocol]){
                return this.transmits[protocol];
            }
            if(web instanceof WebView){
                this.webView = web
            }else if(web instanceof  Function){
                this.webView = web();
            }
            var tran = new MessageTransmit(protocol,this.webView,handle);
            this.transmits[protocol] = tran;
            return  tran;
        }
        return null;
    };
    //取消 消息处理器
    unregister = (protocol)=>{
        if(Object.keys(this.transmits).includes(protocol)){
            delete this.transmits[protocol];
        }
    };

    //消息处理函数
    handleMessage=(e)=>{
        var data = e.nativeEvent.data;
        if(data){
            try{
                var result  =  JSON.parse(data);
                if(result){
                    /**
                     *{
                 *  id:ID,
                 *  protocol:XX
                 *  status:1/0   有无表示是否为信息或者为回复
                 *  data:obj     回复时 没有
                 * }
                     * */
                    var transmit =  this.transmits[result["protocol"]];
                    if(transmit){
                        if(Object.keys(result).includes("status")){
                            //是状态回复
                            transmit._dispense(result);
                        }else{
                            //全新消息
                            if(transmit.handle){
                                transmit._revert(result,transmit.handle(result["data"]));
                            }else{
                                transmit._revert(result,true);
                            }
                        }
                    }else{
                        result["reason"]="protocol no undefined";
                        transmit._revert(result,false);
                    }
                }
            }catch (err){
                console.log(`消息不能正常解析`+`${data}`)
            }
        }else{
            console.log("无消息体");
        }
    };
}

module.exports = new ReactWebViewBridge();

/**
 *
 *      ReactWebViewBridge  管理器
 *          {
 *              protocol:消息分发器
 *          }
 *
 *     MessageTransmit 消息分发器
 *          {
 *             ID / 任务 / 回调
 *          }
 *
 *     Task 单个消息任务
 *
 *
 *
 *    var Bridge = require("./ReactWebViewBridge"),
 *    var transmit = Bridge.register("Image",web,func(data){
 *          这里是接受Window 发送过来的消息
 *
 *          return success 默认为true
 *    });
 *    transmit.send(obj,(status)=>{
 *          消息发送状态回调
 *    })
 *    <WebView
 *         source={}
 *         onMessage={Bridge.handleMessage}
 *    >
 *    //组件销毁时
 *    Bridge.unregister("Image");
 * */