* 有关Dom操作的库 不能使用
* 其他的可以使用 例如 Rxjs Redux

```
	import {Observable,Subject} from "rxjs/Rx"
	import 'rxjs/add/observable/of';
	import 'rxjs/add/operator/map';
```

* 有用的第三方库
	
	*	create-react-context 
			提供一个容器  便于在整个周期下使用变量
			
			```
				import createReactContext from 'create-react-context';
				const NavigationContext = createReactContext(默认值);
				NavigationProvider = NavigationContext.Provider;
				const NavigationConsumer = NavigationContext.Consumer;
				<NavigationProvider value = {xxxValue}>
					无论层级
					<NavigationConsumer>
						{
							xxxValue =>{
								return View
							}
						}
					</NavigationConsumer>
				</NavigationProvider>
			```
	* 高阶组件 
			
		```
		高阶组件是一个函数 接受参数 和 低阶组件  返回高阶组件
		便于代码复用
		function(param){
			拦截 
			return function(Component){
				return NewComponent
			}
		}
		库 hoist-non-react-statics 这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上 解决static 属性丢失
		实例 https://github.com/reduxjs/react-redux/blob/master/src/components/connectAdvanced.js
		说明 https://segmentfault.com/a/1190000008112017?_ea=1553893
		```	
			


* 部分第三方库 [第三方库集合](https://www.jianshu.com/p/53ff78168acc)
	
	* 导航navigation
	* 建议必须Redux
	* 建议必须Saga
	* UI
		* teaset(UI库)
		* react-native-elements (UI组件库)
		* NativeBase（UI库）
		* 日历 react-native-calendars
		* 按钮 
			* apsl-react-native-button 基本
			* react-native-button
		* 多选 react-native-checkbox
		* iOS系统分享 react-native-activity-view
		* 引导页、启动
			* react-native-app-intro
			* react-native-swiper 轮播图
			* react-native-splash-screen
		* 文本 输入框
			* react-native-textinput-effects
			* React-Native-TextInputLayout
		* 提示框
			* 	文字提示 react-native-easy-toast
			*  teaset 菊花/文字/(图片文字)。但不能阻止点击事件
			*  数据loading界面 react-native-loading-w
			*  react-native-spinkit
		* ListView
			* react-native-swipeout 侧滑按钮
			* cell ios风格 react-native-item-cell
			* 多选框 react-virtualized-checkbox
			* react-native0gifted-listview 上下拉
		* 轮播图 
			* react-native-swiper
			* react-native-snap-carousel 支持更多效果
		* 图片
			* react-native-lightbox  全屏浏览图片
			* react-native-image-crop-picker 相册  图片剪切
			* 拍照和图片选择 react-native-image-picker
			* react-image-crop 图片剪切
			* react-native-image-progress 图片加载进度
			* react-native-fast-image 高性能
			* react-native-img-cache
			* react-native-cached-imageß
		* 地图 react-native-maps 
		* 设备旋转监听 react-native-orientation
		* picker react-native-picker
			* 时间
			* 位置、城市
		* popover
			* 系统
			* react-native-popover
		* 标签切换 react-native-scrollable-tab-view
		* 下拉放大  react-native-parallax-view
		* modal弹出 
			* react-native-modalbox
			* react-native-simple-modal
			* react-native-root-modal
		* 毛玻璃 react-native-blur
		* 简单的表格、图表 
			* react-native-chart
			* react-native-pathjs-charts
		* SVG react-native-svgkit 
		* icons react-native-vector-icons 
		* 颜色选择器 react-native-color-picker
		* 折叠的控件 
			* react-native-collapsible
			* react-native-foldview
			* react-native-accordion
		* 侧栏 react-bative-drawer
		* 通讯录 react-native-alphabetlistview
		* 手势解锁 react-ative-gesture-password
		* 聊天 react-native-gifted-chat
		* 拍照和图片选择 react-native-image-picker
		* 富文本
			* react-native-zss-rich-text-editor
			* react-native-markdown
		* 浏览器
			* react-native-safari-view 在safari打开页面
			* react-naive-webview-android 
			* react-native-webrtc WebRTC 
			* react-native-htmlView 把Html文件转为React View
			* react-native-webview-bridge 实现RN和Web双向通信(window.postMessage)
				*  自己的 RN-html
				*  html-ios-RN

			
	* 缓存 	
		* 数据库缓存
		* react-native-http-cache 如果你没使用第三方缓存库 可以直接使用该缓存管理
		* 管理磁盘缓存/ios http请求的磁盘缓存(包括图片缓存(RN本身的图片缓存))
		* react-native-cached-image/react-native-img-cache  图片显示 管理 缓存框架
		
		
	* 数据存储
		*  react-native-storage 本地存储(AsyncStorage/LocalStorage)
		*  sqlite存储 react-native-sqlite-storage
		*  react-native-storage(AsyncStorage)
		*  react-native-fetch-blob 访问本地文件和网络数据交换
	* 动画
		* react-native-animatable动画库
		* react-native-spinkit 加载动画
		
	* 数据上传
	* CSS布局
		* react-native-css
	* Style扩展
		* react-native-extended-stylesheet
		* 百分比、全局变量、主题、媒体选择器
	
	
	