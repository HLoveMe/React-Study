* 创建工程

	```
	react-native init MyApp --version 0.44.3
	cd MyApp
	react-native run-ios
	```
* 编程思维为Web 编程
	* 组件都是默认为父组件宽度 类似 div
	* 子组件会默认撑开父组件   
	* 子组件即使超出父组件范围 也会显示出来  overflow控制
	
* 不是Web 思维
	* 父组件的样式并不能被子组件继承
	* Text 可以继承父Text样式

* React 数据流向
	* 数据流向是单向的  有父组件流向子组件 通过props
	* 子组件无法直接把数据流向父组件
		* 把父组件某个函数通过props传递
		* 复杂情况 需要redux解决
		
* 方法申明
	* 框架提供的方法直接使用 render(){}
	* 自己的方法如果也想直接 ZZ(){} 必须要自己进行绑定 XX.bind(this)
	* 建议 XX = ()=>{} 就不需要手动绑定
