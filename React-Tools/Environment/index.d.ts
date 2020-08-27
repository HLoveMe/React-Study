/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-04 14:18:29
 * @LastEditTime: 2019-12-04 14:18:31
 * @Author: 朱子豪
 * @Description: 
 */
// EnvirType,isCloseRemoveDebugger,isStartReactRemoveDebugger,getJSEnvironment

export declare enum EnvirType {
    /**
     * WIndow 浏览器 运行环境
     */
    WINDOWS = "win",
    /**
     * MAC 浏览器 运行环境
     */
    MACINTOSH = "mac",
    /***
     * Linux 浏览器 运行环境
     */
    LINUX = "linux",
    /***
     * ios 浏览器  运行环境
     */
    IOS = "iOS",
    /**
     * 安卓 浏览器 运行环境
     */
    ANDROID = "Android",
    /**
     * 黑莓 运行环境
     */
    BLACKBERRY = "bb",
    /***
     * Win iphone 运行环境
     */
    WINDOWS_PHONE = "winphone",
    /**
     * React-Native 运行环境
     * 直接运行在手机上的React-native环境
     */
    REACTNATIVE = "react-native"
}

/**
 * 是否react-native 并且关闭远程调试
 */
export declare type isCloseRemoveDebugger = () => Boolean
/**
 * 是否react-native 并且开启远程调试
 */
export declare type isStartReactRemoveDebugger = () => Boolean

export declare type EnvirResult = { [key: String]: any }
/**
 * 获取当前js 环境
 */
export declare type getJSEnvironment = () => EnvirResult;