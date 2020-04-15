Conetnt  两种使用方法

* [React.createContext](./React_Content.md)

* 组件Context 父子组件之间传递

	* childContextTypes  指定给子组件的Context类型

	* getChildContext  父组件给子组件的Context对象
	
	* contextTypes 子组件申明得到父组件Context类型[必须指定]

	
	```
	class A {
		static childContextTypes={
			name:PropTypes.string
		}
		getChildContext(){
			return {
				name:"aa"
			}
		}
	}
	
	class C{
		static contextTypes={
		}
		render(){
			this.context
		}
	}
	```

