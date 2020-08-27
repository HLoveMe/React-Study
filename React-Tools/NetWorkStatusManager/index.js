import { NetInfo, Platform } from 'react-native';
import { BehaviorSubject } from "rxjs";

export const ConnectStatus = {
    isConnect: true,
    noConnect: false

}

export const NetStatus = {
    None: ("None"),
    Wifi: ("Wifi"),
    Cell: ("Cell"),
    Other: ("Other")
}

export class Status {
    isConnected = ConnectStatus.isConnect
    type = NetStatus.None
    date = new Date()
    constructor(type = NetStatus.None) {
        this.type = type
        this.isConnected = (type == NetStatus.Wifi || type == NetStatus.Cell) ? ConnectStatus.isConnect : ConnectStatus.noConnect
    }
}

class _NetWorkStatusManager {
    //当前是否连接状态
    isConnected = ConnectStatus.isConnect

    //上次的网络状态
    last = new Status()

    //当前的网络状态
    current = new Status()

    //监听网络网络状态变换
    netStatusChangeSubject = null;

    //监听连接状态变化
    isConnectSubject = null;

    constructor() {
        this.netStatusChangeSubject = new BehaviorSubject({ last: this.last, current: this.current })
        this.isConnectSubject = new BehaviorSubject(this.isConnected)

        NetInfo.addEventListener(
            'connectionChange',
            this.netStatusChange.bind(this)
        );
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.connectionChange.bind(this)
        )
        NetInfo.getConnectionInfo().then((Type) => {
            let Now = new Status((this._netStatus(Type)))
            this.last = this.current = Now;
            this.netStatusChangeSubject.next({ last: this.last, current: this.current })
        })

    }
    netStatusChange(connectionInfo) {
        this.last = this.current
        this.current = new Status(this._netStatus(connectionInfo))
        this.netStatusChangeSubject.next({ last: this.last, current: this.current })
    }
    connectionChange(isConnected) {
        this.isConnected = isConnected ? ConnectStatus.isConnect : ConnectStatus.noConnect
        this.isConnectSubject.next(this.isConnected)
    }


    /**
     * //增加网络 状态 变换 模式监听
     * @param {*} last 上一次的状态
     * @param {*} current 当前的状态
     * @param {*} handle   回调
     *
     *  listen = NetWorkStatusManager.addEventListener(NetStatus.None,NetStatus.Cell,()=>{
     *
     *  })
     *  remove
     *
     *  listen.unsubscribe()
     */
    addStatusEventListener(lastStatus, currentStatus, handle) {
        return this.netStatusChangeSubject.subscribe(({ last, current }) => {
            if (last.type == lastStatus && current.type == currentStatus) {
                handle && handle({ last, current })
            }
        })
    }
    /**
     * //增加网络 连接 变换 模式监听
     * @param {*} last 上一次的是否连接
     * @param {*} current 当前的是否连接
     * @param {*} handle   回调
     *
     *  有无网络 变为有网络
     *  listen = NetWorkStatusManager.addEventListener(ConnectStatus.noConnect,ConnectStatus.isConnect,()=>{
     *
     *  })
     *  remove
     *
     *  listen.unsubscribe()
     */
    addConnectEventListener(LConnect, CConnect, handle) {
        return this.netStatusChangeSubject.subscribe(({ last, current }) => {
            // alert(JSON.stringify({"a":last, "b":current,LConnect,CConnect}))
            if (last.isConnected == LConnect && current.isConnected == CConnect) {
                handle && handle({ last, current })
            }
        })
    }

    _netStatus = (connectionInfo) => {
        let status = NetStatus.None
        let type = connectionInfo.type || connectionInfo
        if (Platform.OS == "ios") {
            switch (type) {
                case "none":
                    status = NetStatus.None
                    break
                case "wifi":
                    status = NetStatus.Wifi
                    break
                case "cell":
                    status = NetStatus.Cell
                    break
                default:
                    status = NetStatus.Other
                    break
            }
        } else {
            switch (type.toUpperCase()) {
                case "NONE":
                    status = NetStatus.None
                    break
                case "UNKNOWN":
                    status = NetStatus.None
                    break
                case "ETHERNET":
                case "BLUETOOTH":
                case "WIFI":
                    status = NetStatus.Wifi
                    break
                case "MOBILE":
                case "MOBILE_HIPRI":
                case "MOBILE_DUN":
                    status = NetStatus.Cell
                    break
                default:
                    status = NetStatus.Other
                    break
            }
        }
        return status
    }
}

export default new _NetWorkStatusManager()