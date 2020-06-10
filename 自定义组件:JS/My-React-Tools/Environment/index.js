/*
 * @Creator: 朱子豪 
 * @Date: 2019-06-04 15:45:42 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-06-04 15:50:38
 * @Desc: js 运行环境
 */


/**
 *  react-native JS代码运行环境
 */
export const EnvirType = {
    /**
     * WIndow 浏览器 运行环境
     */
    WINDOWS: "win",
    /**
     * MAC 浏览器 运行环境
     */
    MACINTOSH: "mac",
    /***
     * Linux 浏览器 运行环境
     */
    LINUX: "linux",
    /***
     * ios 浏览器  运行环境
     */
    IOS: "iOS",
    /**
     * 安卓 浏览器 运行环境
     */
    ANDROID: "Android",
    /**
     * 黑莓 运行环境
     */
    BLACKBERRY: "bb",
    /***
     * Win iphone 运行环境
     */
    WINDOWS_PHONE: "winphone",
    /**
     * React-Native 运行环境
     * 直接运行在手机上的React-native环境
     */
    REACTNATIVE: "react-native"
}
/**
 * 是否为 rn 代码
 */
export function isReactNative() {
    let GLOBAL = global || window;
    return GLOBAL && GLOBAL.ReactNative && GLOBAL.ReactNative.NativeModules
}
/**
 * 是否开启远程debugger
 */
export function isStartReactRemoveDebugger() {
    let currentEnvName = getJSEnvironment().name;
    return isReactNative()
        &&
        (
            currentEnvName == EnvirType.WINDOWS ||
            currentEnvName == EnvirType.MACINTOSH ||
            currentEnvName == EnvirType.LINUX
        )
}
/**
 * 是否关闭远程debugger
 */
export function isCloseRemoveDebugger(){
    return isReactNative() && getJSEnvironment().name == EnvirType.REACTNATIVE;
}

/**
 * @return {name:EnvirType,versionStr:""}
 */
export function getJSEnvironment() {
    if (navigator.userAgent) {
        var userAgent = navigator.userAgent;
        var platform, result;
        function getDesktopOS() {
            var pf = navigator.platform;
            if (pf.indexOf("Win") != -1) { // 说明当前是Windows操作系统
                var rVersion = /Windows NT (\d+).(\d)/i;
                var uaResult = userAgent.match(rVersion);
                var sVersionStr = "";
                if (uaResult[1] == "6") {
                    if (uaResult[2] == 1) {
                        sVersionStr = "7"; // 说明当前运行在Windows 7 中
                    } else if (uaResult[2] > 1) {
                        sVersionStr = "8"; // 说明当前运行在Windows 8 中
                    }
                } else {
                    sVersionStr = uaResult[1];
                }
                return { "name": EnvirType.WINDOWS, "versionStr": sVersionStr };
            } else if (pf.indexOf("Mac") != -1) {
                return { "name": EnvirType.MACINTOSH, "versionStr": "" }; // Macintosh操作系统
            } else if (pf.indexOf("Linux") != -1) {
                return { "name": EnvirType.LINUX, "versionStr": "" }; // 说明当前运行在Linux操作系统
            }
            return null;
        }
        platform = /Windows Phone (?:OS )?([\d.]*)/; // windows phone的正则表达式
        result = userAgent.match(platform);
        if (result) {
            return ({ "name": EnvirType.WINDOWS_PHONE, "versionStr": result[1] });
        }
        // BlackBerry 10
        if (userAgent.indexOf("(BB10;") > 0) {
            platform = /\sVersion\/([\d.]+)\s/; // BlackBerry的regular expression
            result = userAgent.match(platform);
            if (result) {
                return { "name": EnvirType.BLACKBERRY, "versionStr": result[1] };
            } else {
                return { "name": EnvirType.BLACKBERRY, "versionStr": '10' };
            }
        }
        // iOS, Android, BlackBerry 6.0+:
        platform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;
        result = userAgent.match(platform);
        if (result) {
            var appleDevices = /iPhone|iPad|iPod/;
            var bbDevices = /PlayBook|BlackBerry/;
            if (result[0].match(appleDevices)) {
                result[3] = result[3].replace(/_/g, ".");
                return ({ "name": EnvirType.IOS, "versionStr": result[3] }); // iOS操作系统
            } else if (result[2].match(/Android/)) {
                result[2] = result[2].replace(/\s/g, "");
                return ({ "name": EnvirType.ANDROID, "versionStr": result[3] }); // Android操作系统
            } else if (result[0].match(bbDevices)) {
                return ({ "name": EnvirType.BLACKBERRY, "versionStr": result[4] }); // Blackberry
            }
        }
        //Android平台上的Firefox浏览器
        platform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
        result = userAgent.match(platform);
        if (result) {
            return ({ "name": EnvirType.ANDROID, "versionStr": result.length == 3 ? result[2] : "" });
        }
        // Desktop
        return getDesktopOS();
    } else {
        return { "name": EnvirType.REACTNATIVE, "versionStr": "" }
    }

}