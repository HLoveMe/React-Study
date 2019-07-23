Text优化
======

```
		Text细节优化
```

* 使用Text

	* 方式一
	
		```
		class A extend Componnet{
			constructor(ops){
				super(ops);
				this.state = {
					name:"无名氏",
					age:18
				}
			}
			render(){
				return (
					<View style={{flex:1}}>
						<Text>
							{this.state.name}======{this.state.age}
						</Text>
					</View>
				)
			}
			componentDidMount() {
				this.setState({name:"AA"})
				this.setState({age:25})
			}
		}
		```
	* 方式二
	
		```
		class A extend Componnet{
			constructor(ops){
				super(ops);
				this.state = {
					name:"无名氏",
					age:18
				}
			}
			render(){
				return (
					<View style={{flex:1}}>
						<Text>
							`${this.state.name}===${this.state.age}`
						</Text>
					</View>
				)
			}
			componentDidMount() {
				this.setState({name:"AA"})
				this.setState({age:25})
			}
		}
		```
		
* 查看传递命令

	* 方式一

		```
		[
			[12, 12],
			[20, 20],
			[
				[25, "RCTRawText", {
					"text": "AA"
				}],
				[27, "RCTRawText", {
					"text": "25"
				}]
			], 195
		]
		```
	* 方式二

		```
		 [
			[7],
			[20],
			[
				[25, "RCTRawText", {
					"text": "AA===25"
				}]
			], 183
		]
		```
		
* 分析

	* 用第一种方式进行构建 `{this.state.name}` 会被独立创建为一个组件RCTRawText。并且 `===`也会被创建为RCTRawText（可以从 [25,27]分析得到该reactTag==26）
	
	* 用第二中方式 会把内容进行模板化 在创建唯一的RCTRavText

* 总结
	
	* Text创建会根据<Text>内容变化
	* 先进行字符串拼接。再进行显示 可以减少组件的创建