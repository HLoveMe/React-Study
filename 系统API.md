系统组件 和 API	
------------
--------
* ActionSheetIOS 弹出sheet 或者分享

	```
		ActionSheetIOS.showActionSheetWithOptions({
			options:[
                "百度",
                "google",
                "CocoaChina",
                "取消",
                "删除"
            ],
            cancelButtonIndex:3,
            destructiveButtonIndex:4,
            title:"标题",
            message:"子标题"
		},(index)=>{})
		
		ActionSheetIOS.showShareActionSheetWithOptions({
            // images, videos, PDF files
            url:"https://www.baidu.com",
            message:"分享",
            subject:"朱子豪",
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        },(err)=>{调用出错},
        (status,method)=>{
        	status调用是否成功
        	method 分享使用的哪种方式
		})
	```
* Alert

	```
	Alert.alert(
  	'Alert Title',
  	'My Alert Msg',
  	[
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
	```
* AlertIOS
	
	```
		AlertIOS.prompt(
            "标题",   
            "消息",
            (msg)=>{}||[{text:"",onPress=()=>{}} style="cancel",{...}]
            "default",
            null
            "web-search"
        )
        1:指明标题
        2:提出的信息
        3:回调 | [按钮数组]
        4:指明弹出类型 有无输入/密码输入...
        5:输入框默认值
        6:第一个输入框键盘
	```
* AppRegistry APP注册

	```
	.registerConfig(config:Array<AppConfig>)  
		static 静态方法, 进行注册配置信息
	
	.registerComponent(appKey:string,getComponentFunc:ComponentProvider)  
		static静态方法，进行注册跟组件
		只有先注册 才能被欢迎唤醒
		appKey -- 原生调用key 必须一致
		
	
	.registerRunnable(appKey:string,func:Function)  
		static静态方法 ，进行注册线程
	
	.registerAppKeys()  
		static静态方法，进行获取所有组件的keys值
	
	.runApplication(appKey:string,appParameters:any) 
		static静态方法, 进行运行应用
	
	.unmountApplicationComponentAtRootTag()  
		static静态方法，结束应用
		_
		_
App顶层增加自己的视图
	AppRegistry.setWrapperComponentProvider
	AppRegistry.registerComponent
		都可实现
		import React, { Component } from 'react';
		import { AppRegistry,View } from 'react-native';
		import StaticContainer from 'static-container';
		import { Provider } from 'react-redux';
		AppRegistry.setWrapperComponentProvider(() => {
		    return class TopView extends Component {
		        constructor(ops) {
		            super(ops)
		            this.state = {
		                children:[]
		            }
		        }
		        render() {
		            return (
		                <AView style={{ flex: 1, backgroundColor: "yellow" }}>
		                    {
		                        this.props.children 原APP
		                    }
		                </AView>
		            )
		        }
		    }
		})
切换 APP

		全 RN 应用
			ios 修改 appdelegate.m
			android
				settings.gradle
				app.java.com.rypa.MainActivity.getMainComponentName
		原生嵌套
			android
				 @Override
    			 protected void onCreate(Bundle savedInstanceState) {
        			super.onCreate(savedInstanceState);
        			mReactRootView = new ReactRootView(this);
        			mReactInstanceManager = ReactInstanceManager.builder()
        			.setApplication(getApplication())
					好多配置
					....
					.build();
					mReactRootView.startReactApplication(mReactInstanceManager, "注册的Appkey", null);
					setContentView(mReactRootView);
    			}
    			
    		ios
    			 [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                     moduleName:@"MyApp"
                                              initialProperties:@{}
                                                  launchOptions:nil];
	```
* AppState监听当前APP所在状态
	
	```
		active - 应用正在前台运行
		background - 应用正在后台运行。用户既可能在别的应用中，也可能在桌面。
		inactive - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图，又或是处在来电状态中。
		
		得到当前状态
			AppState.currentState  
		监听状态变化
			AppState.addEventListener("change| memoryWarning",func)
	```
* AsyncStorage 提供序列化存储
	
	```
		http://reactnative.cn/docs/0.46/asyncstorage.html#content
	```
* BackHandler 监听回退  ios无作用
* CameraRoll  相册访问

	```
	相册选取 图片裁剪
	https://github.com/ivpusic/react-native-image-crop-picker
	```
* Clipboard剪切板
	
	```
		_getContent() { 
			var content = Clipboard.getString();
		}
		_setContent() { 
			Clipboard.setString('hello world');
		}
	```
* DatePickerAndroid 日历选择
* TimePickerAndroid
* Dimensions  获取屏幕信息
	
	```
		
		可以在任何地方使用  / 值是会变化的 
		{fontScale: 1, width: 375, height: 667, scale: 2}
		
		static get(dim: string) "screen|window"
		static addEventListener(type, handler) "change"
		static removeEventListener
		
	```
* Geolocation  地理位置
	
	```
		static requestAuthorization()
		static getCurrentPosition(succ: Function, fail?: Function, ops?: GeoOptions) 
		static watchPosition(success: Function, error?: Function, options?: GeoOptions) 
		static clearWatch(watchID: number) 
		static stopObserving() 
		
		 GeoOptions{
		  timeout: number,
		  maximumAge: number,
		  enableHighAccuracy: bool,
		  distanceFilter: number,
		}
	```
* ImageEditor 图片裁剪
* ImageStore  操作内存图片
* InteractionManager 
	
	```
		控制耗时任务 保证动画顺利执行 和 顺利响应用户响应
		
		static runAfterInteractions(func)=> Promise (cancel)			
			func 函数内的代码 会在保证动画流畅的前提下执行
		static createInteractionHandle();
			通知管理器动画开始或者交互
		static clearInteractionHandle(handle: Handle) 
			通知管理器有某个动画或者交互已经结束了。
		static setDeadline(deadline: number)
			会挂起所有任务 number后执行
		property	
				addListener
				Events
			
		var handle = InteractionManager.createInteractionHandle();
			执行动画
			runAfterInteractions 代码就等待		
		InteractionManager.clearInteractionHandle(handle);		
	```	
* Keyboard  键盘操作
	
	```
		static addListener(nativeEvent, jsFunction) 
			keyboardWillShow
			keyboardDidShow
			keyboardWillHide
			keyboardDidHide
			keyboardWillChangeFrame
			keyboardDidChangeFrame
		static removeListener(eventName, callback)
		static removeAllListeners(eventType) 
		static dismiss()收起键盘
	```
* LayoutAnimation  

	```
		指示下一次刷新UI 使用的动画效果
		
		static create(duration: number, type, property) 
			创建Config
		static configureNext(config: Config, onAnimationDidEnd?: Function)
			指定下次UI刷新动画效果
		static Types 属性 时间函数类型
		static Properties 属性 property
		
		static easeInEaseOut/linear/spring 
		
		
		Config{
			duration: number,
			create?: Anim, 创建时使用动画
			update?: Anim,更新
			delete?: Anim{ 删除
				duration?: number, 周期
				delay?: number,    延迟
				springDamping?: number,
				initialVelocity?: number,
				type?: spring。。。。
				property?: opacity/scaleXY
			}
		}
	系统指定
	  	LayoutAnimation.easeInEaseOut()
	自定义
		指定UI刷新使用的动画
		LayoutAnimation.configureNext({
            duration: 800,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
            }
        },func)
		然后UI刷新
		this.setState({...})
		
		android 需要调用
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	```
* Linking  处理App 被调用 后者调用外部App
* NativeMethodsMixin 提供了对底层原生组件的访问能力
	
	```
		API 已经转移到组件本身
	```
* NetInfo 获取网络状态
* PanResponder  手势
* PixelRatio 根据手机像素密度 操作  1x  2x   3x 
* PushNotificationIOS 处理本地通知 和远程通知
* Share  分享框
* StyleSheet 用于创建css 样式
	
	```
		StyleSheet.create({
			A:{
				color:
				fontSize:
			},
			BB:{
				CC:{
				
				}
			}
		})
		
		hairlineWidth 设备最小宽度
		absoluteFillObject / absoluteFill
			{
				position: "absolute", 
				left: 0,
				right: 0, 
				top: 0, 
				bottom: 0
			}
		
	```
* Vibration 震动
	
	```
		static vibrate(pattern, repeat)
			android 
				pattern:[100,200,100,300]
				等待100ms 震动200ms 等待100ms 震动 300....
			ios 
				pattern:[100,200,300,400]
				等待100ms 震动 等待200ms 震动  等待300ms 震动
		static cancel() 
	```
* Platform   平台
	
	```
		Platform.OS == "ios" /"android"
		
		Platform.select({ 自动根据平台进行区分
			ios:{}/()=>{}
			android:{}/()=>{}
		})
		
		isPad/isTVOS/Version
	```
* 网络 Fetch 就是更高级的请求API 使用的是Promise

	```
		window.fetch
		Request:
			method - 支持 GET, POST, PUT, DELETE, HEAD
			url - 请求的 URL
			headers - 对应的 Headers 对象
			referrer - 请求的 referrer 信息
			mode - 可以设置 cors, no-cors, same-origin
			credentials - 设置 cookies 是否随请求一起发送。可以设置: omit, same-origin
			redirect - follow, error, manual
			integrity - subresource 完整性值(integrity value)
			cache - 设置 cache 模式 (default, reload, no-cache)
		
		Response:
			type - 类型,支持: basic, cors
			url
			useFinalURL - Boolean 值, 代表 url 是否是最终 URL
			status - 状态码 (例如: 200, 404, 等等)
			ok - Boolean值,代表成功响应(status 值在 200-299 之间)
			statusText - 状态值(例如: OK)
			headers - 与响应相关联的 Headers 对象.
			clone() - 创建一个新的 Response 克隆对象.
			error() - 返回一个新的,与网络错误相关的 Response 对象.
			redirect() - 重定向,使用新的 URL 创建新的 response 对象..
			arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.
			blob() - 返回一个 promise, resolves 是一个 Blob.
			formData() - 返回一个 promise, resolves 是一个 FormData 对象.
			json() - 返回一个 promise, resolves 是一个 JSON 对象.
			text() - 返回一个 promise, resolves 是一个 USVString (text).
		
		fetch(request)	
		fetch(url,{
			method:'',
			headers:new Header({
				...
			}),
			mode:
			referrer:
			credentials:
			integrity:
			cache:
			boby:"name=XX&age=11"
		})
		
		fetch(request).then((response)=>{
			//response.text();
			//response.blob(); 加载图片
			return response.json()
		}.then((json)=>{
			img.src = URL.createObjectURL(imageBlob);
		}).catch()
		
	```
* WebSocket

	```
		var ws = new WebSocket('ws://host.com/path');
		ws.onopen = () => {};
		ws.onmessage = (e) => {};
		ws.onerror = (e) => {};
		ws.onclose = (e) => {};
		
		ws.send(String|ArrayBuffer|ArrayBufferView|Blob)
		ws.close()
	```
* NativeModules  这个对象包含所有模块

	```
		该对象涵盖所有原生开发组件的引用
		import { 模块Name } from NativeModules
		NativeModules.模块Name  得到模块
		。
AccessibilityManager
ActionSheetManager
AlertManager
AppState   APP所处的状态
AsyncLocalStorage  存储
BlobModule
Clipboard  剪切板
DevLoadingView
DevMenu
DevSettings
DeviceInfo   设备信息
ExceptionsManager
I18nManager   多语言管理
ImageEditingManager  图片编辑
ImageStoreManager  图片存储
ImageViewManager   
JSCSamplingProfiler
KeyboardObserver   键盘
LinkingManager     Linking
LocationObserver   位置
NativeAnimatedModule 动画
NavigatorManager
NetInfo        网络信息
Networking   网络加载
PlatformConstants
RedBox
ScrollViewManager
SettingsManager
SourceCode
StatusBarManager
Timing
UIManager
Vibration
WebSocketModule
WebViewManager

		....
	```
* UIManager
	
	```
		引用所有UI组件（类） 不是实例 
		UIManager.UIClassName
	```
* findNodeHandle

	```
		通过ui对象 得到 reactTag 值
	```
* React

 ```
 	最基础的API
 	Children: 这是为了解决 this.props.children 提供的便捷API
 		{
 		 	count
 		 	forEach
 		 	map
 		 	only   仅仅容许一个子组件
 		 	toArray
 		 ```
 		 	React.Children.map(this.props.children,func(){
 		 	
 		 	})
 		....
 		 ```
 		}
 	Component: React 所有组件基类
 	PureComponent: 解决渲染能力问题的基础组件
 	PropTypes：所有支持的属性类型
 	checkPropTypes：属性检测函数
 	cloneElement：func clone 子组件 并可设置props
	 	React.cloneElement(
 				React.Children.only(this.props.children),保证只有一个子组件
	 			{props设置}，
	 			children
 		)
 		。。
作用：解决组件嵌套问题
	<CustonView>
		<Text>AA</Text>  如果不做处理这里面的内容是无效的
	</CustomView>
 ```
* 通知  
	*  RN之间通知 DeviceEventEmitter
	*  OC-RN通知 self.bride.eventDispatcher sendApp..
* 定时器
	
	```
		setTimeout, clearTimeout
		setInterval, clearInterval
		setImmediate, clearImmediate
			代码会在 代码块执行后 执行
		requestAnimationFrame, cancelAnimationFrame
			帧
	```

* 截屏
	
	```
	takeSnapshot API
	或者
	import {UIManager} from 'react-native';
	var ReactNative = require('react-native');
	
	UIManager.__takeSnapshot("window",{format:"png",quality:0.4}).then((url)=>{
            console.log(url)
    })
    
	ReactNative.takeSnapshot(
	"window"/ele,
	options ?: {
     width ?: number,
     height ?: number,
     format ?: 'png' | 'jpeg',
     quality ?: number,
  }).then((url)=>{
            console.log(url)
		   	内部还是掉上面的    
   })
	```
* Native --- JS

	![](./WechatIMG7.jpeg)