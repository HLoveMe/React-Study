Image 加载
-----
* 分类
	* my-icon.ios.png
	* my-icon.android.png
* 分辨率
	* icon@2x.png
	* icon@3x.png
* 使用

	```
	A:<Image source={ require('./Images/1.jpg') }></Image>
		1:加载本地资源 
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