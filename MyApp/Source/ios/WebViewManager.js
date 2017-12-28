/**
 * Created by zhuzihao on 2017/7/25.
 */
(function (window) {
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    }
    var  MESSAGE_SPACE = 100;//ms
    var  last = 0;
    Task = function (id,handle) {
        this.id = id;
        this.handle = handle;
    };
    MessageTransmit = function (protocol,handle) {
        this.protocol = protocol;
        this.tasks = {};
        this.handle = handle;
        var self = this;
        //发送消息
        this.send =function (data,handle) {
            if(window.postMessage){
                var id = uuid();
                var info={
                    id:id,
                    protocol:self.protocol,
                    data:data
                };
                var task = new Task(id,handle);
                self.tasks[id] = task;
                self._send(JSON.stringify(info));
            }
        }
        //接收消息回复
        this._dispense=function (result) {
            var id  = result["id"];
            var task = self.tasks[id];
            if(task.handle){
                task.handle(result['status'],result["reason"]);
            }
            delete self.tasks[id];
        };
        //回复消息接收状态
        this._revert=function (result,res) {
            delete  result["data"];
            result["status"] = (res != false);
            self._send(JSON.stringify(result));
        };

        this._send=function (data) {
            var newD = new Date().getTime();
            if(last == 0 || (newD - last) >=MESSAGE_SPACE){
                window.postMessage(data);
                last = newD;
            }else{
                setTimeout(()=>{
                    window.postMessage(data);
                },MESSAGE_SPACE-(newD-last));
                last = last+MESSAGE_SPACE;
            }
        }
    };
    ReactWebViewBridge = function () {
        this.transmits = {};
        var self = this;
        this.register = function (protocol,handle) {
            if(protocol != null && protocol.length >=1){
                var tran = new MessageTransmit(protocol,handle);
                self.transmits[protocol] = tran;
                return  tran;
            }
            return null;
        };
        this.unregister =function (protocol) {
            if(Object.keys(self.transmits).includes(protocol)){
                delete  self.transmits[protocol];
            }
        };
        //使用消息分发

        this.handleMessage = function (event) {
            var data = event.data;
            if(data){
                var result  =  JSON.parse(data);
                if(result){
                    /**
                     *{
                 *  id:ID,
                 *  protocol:XX
                 *  status:true/   有无表示是否为信息或者为回复
                 *  data:obj     回复时 没有
                 * }
                     * */
                    var transmit =  self.transmits[result["protocol"]];
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

            }else{
                console.log(`消息不能正常解析`+`${data}`)
            }
        }
    };
    window.Bridge = new ReactWebViewBridge();
})(window);

/**
 *
 * <script src="./WebViewManager.js"></script>
 *
 * document.addEventListener("message",Bridge.handleMessage);
 *
 * var trans = Bridge.register("Image",function (data) {
 *       接受消息
 *      return success; 默认true
 * });
 * trans.send(obj,func(){
 *      发送消息 的 状态
 * })
 * */