Image 加载
-----
* 分类
	* my-icon.ios.png
	* my-icon.android.png
* 分辨率
	* icon@2x.png
	* icon@3x.png
* 资源

	```
		图片在打包之后就会被打包作为App图片资源
		js 会提供 resolveAssetSource() 解决图片资源问题
			1：于jsbundle一起打包的图片  
				require('') 不需要携带@2x
			2：ios系统工程Asset
				require(name即可)
			3:网络图片
	```
* 缓存框架

	```
		1：FB 有完整的一套缓存框架  但基本不使用
		2：不使用任何缓存框架 图片还是有缓存  这是因为在提供NSURLCache对请求进行了同一缓存
		3：第三方缓存框架 react-native-img-cache 
	```
* 使用

	```
	A:<Image source={ require('./Images/1.jpg') }></Image>
		1:加载本地资源  required("../../a.png"
		2:会显示图片默认大小
		3:require(必须是常量，不能包含变量)
		4:自动缩放图片 { width: undefined, height: undefined,flex:1 }

	B:<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
		1.使用已经加入到XCode图片
	
	C:<Image source={
		{
			uri: 'url',
			method:"",
			headers:{
			},
			body:{}
		}
	} style={{width: 400, height: 400}} />
		1:加载网络图片 
		2：需要指定大小 否则会出现UI变动问题
		3：cache only ios
			{
			default：使用原生平台默认策略。
			reload：URL的数据将从原始地址加载。不使用现有的缓存数据。
			force-cache：现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则从原始地址加载。
			only-if-cached：现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则不尝试从原始地址加载，并且认为请求是失败的。
			}
	D:使用相册图片
```

* 图片缓存 [介绍](http://awhisper.github.io/2016/07/17/Talk-about-ReactNative-Image-Component/)
	* RN 原生端缓存 基本没做事件 
	* RN http 图片缓存直接把Response直接缓存
	* 第三方缓存方案 react-native-img-cache

* 图片组件
	* Image系统
	* react-native-image-progress 支持加载动画
	* react-native-img-cache
		一套完整的图片加载、显示、缓存框架