React OC 
------

* RCTRootView

	```
		展示React所有内容的根视图
		[[RCTRootView alloc] 
			initWithBundleURL:path 
			moduleName:@"MyApp - React APP Name"
			initialProperties:@{} 只有顶层组件才能引用
			launchOptions:launchOptions];
		
		appProperties:Dic 替换initialProperties 主线程执行
		delegate:
	```
		
* RCTConvert  支持json标准格式 转换

	```
	扩展RCTConvert 以支持 自定义类型
	
	枚举扩展：		
		RCT_ENUM_CONVERTER(PositionType, (@{
                                    @"left":@(Left),
                                    @"right":@(Right),
                                    @"top":@(Top),
                                    @"bottom":@(Bottom)
                                    }), Left, intValue);
	
	值转换扩展
		RCT_CONVERTER(CLLocationDegrees, changeDegress, doubleValue);
		
		会自动生成double 转换CLLocationDegrees 的代码
		
		使用：
		{
			CLLocationDegrees value = [RCTConvert  changeDegress: double];
		
		}
		
	类型值转
		+(NSinvocation*)invocation:(id)json{
			xxxx
		}
	```