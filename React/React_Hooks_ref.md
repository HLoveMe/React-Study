* React.createContext 

	创建上下文 以便于父子组件进行数据交互

	```
	const Context = React.createContext(100);
function ChildView() {
    return (
        <Context.Consumer>
            {(value) => {
                return (
                    <View>
                        <Text>{value}</Text>
                    </View>
                )
            }}
        </Context.Consumer>
    )
}
class TestView extends Component {
    constructor(ops) {
        super(ops)
        this.state = {
            value: 0
        }
    }
    componentDidMount() {
        this.setState({
            value: 99999
        })
    }
    render() {
        return (
            <View>
                <Context.Provider value={this.state.value}>
                    <ChildView></ChildView>
                </Context.Provider>
            </View>
        )
    }
}
	```
	```
	class 组件 使用 .Consumer  用来获取Context
	function组件使用 useContext hooks函数 获取Context
	```
	
* React.memo

	* 包装函数组件 自动帮组件执行shouldComponentUpdate() , 但是只是执行浅比较；类似于 React.PureComponent
	* 这个高阶函数存在是作为一种性能优化的方式。不要使用它去纯粹地阻止渲染

	```
	function DomeView(){
		return (<View></View)
	}
	export default React.memo(DomeView)
	```
	
* React.lazy
	* 是代码切割的一部分 用于组件的懒加载

* React.forwardRef React.useRef React.creareRef
	
	* 解决重复使用的组件 ref应用问题
	*  React.creareRef  引用Dom节点 和 React元素
	*  React.useRef 仅仅是个盒子  可以指向任何对象
	*  React.forwardRef 解决funcComponent 不能ref的问题 创建新的组件

		*  useRef 属于hook 只能用于function 多次render 仅仅返回一个对象
		*  createRef可以在function 或者 class中使用   多次render 返回不同对象 

	```
	const Button =(props)=>{
		return <button {...props}/>
	}
	const Button2 =  React.forwardRef((props,ref)=>{
		return (
			<button {...props} ref={ref} />
		)
	})
	const Buttons = React.for
	const BView = (props)=>{
		const button = React.useRef(null);
		//const button  = React.creareRef();
		return (
			<Button ref={button}/>//报错 ref 不能自动使用在function组件上
			<Button2 ref={button}/>正确
		)
	}
	```
	```
	//需要重复使用的组件
	const CustomInput = React.forwardRef((props,ref)=>{
		return <input {...props} ref={ref}>
	})
	class AC extends Co{
		con(){
			//用于接收Dom组件的引用
			this.textref = React.creareRef();
		}
		didMount(){
			//input 引用
			this.textref.blur()
		}
		render(){
			return (
				<div>
					<CustomInput ref={this.textref}/>
				</div>
			)
		}
	}
	```
	```
	高阶组件
	import React, { Component, createRef } from 'react';

		const FocusInput = React.forwardRef((props, ref) => <input type="text" ref={ref} />);
		
		const bindRef = (WrappedComponent) => {
		    const ConvertRef = (props) => {
		        const { forwardedRef, ...other } = props;
		        console.log(forwardedRef);
		        return <WrappedComponent {...other} ref={forwardedRef} />;
		    };
		    // “ref”是保留字段需要用普通的字段来代替，传递给传入的组件
		    return React.forwardRef((props, ref) => {
		        console.log(ref);
		        return <ConvertRef {...props} forwardedRef={ref} />;
		    });
		};
		
		const FocusInputWithRef = bindRef(FocusInput);
		
		class ForwardRef extends Component {
		    constructor(props) {
		        super(props);
		        this.ref = createRef();
		    }
		
		    componentDidMount() {
		        const { current } = this.ref;
		        current.focus();
		    }
		
		    render() {
		        return (
		            <div>
		                <p>forward ref</p>
		                <FocusInputWithRef ref={this.ref} />
		            </div>
		        );
		    }
		}
		export default ForwardRef;
	```
* React.Fragment	
	
	* 类似于 <></> 空标签
	* 解决需要返回多个标签 但是不需要多余父类的情况
	
		```
		function Columns1(){
			return (
				<div>
					<td>1111</td>
					<td>2222</td>
				</div>
			)
		}
		function Columns2(){
			return (
				<React.Fragment>
					<td>1111</td>
					<td>2222</td>
				</React.Fragment>
			)
		}
		
		function Table(){
			return (
				<table>
					<tr>
						<Columns1 />
					</tr>
					<tr>
						<Columns2 />
					</tr>
				</table>
			)
		}
		Columns1 是没法达到要求的
			<table>
			  <tr>
			    <div>=======>多余的
			      <td>Hello</td>
			      <td>World</td>
			    </div>
			  </tr>
			</table>
		```

* Hooks 用于函数组件中

	```
	useState
	useEffect
	useContext
	useReducer
	useRef
	useMemo
	useCallback

	只能在函数的第一层 
	不能包含在for 或者 if中
		react 会根据useState使用顺序来保证下一次渲染可以拿到对应的值 [如何保证多个useState的相互独立]
	```
	* useState
	
		```
		functuon View(pros){
			const [count,setCount]=useState(0);
			const [name,setName] =useState("AA");
			if(xxxx){
				//错误
				const [name,setName] =useState("AA");
			}
			return <Text>{name}{count}</Text>
		}
		```
	* useEffect 副作用函数
		
		* 创建过程中会吧副作用函数和组件绑定的副作用函数
		* 在每次渲染中都会执行所有副作用函数 
		* 函数都是异步执行
		* 每次渲染都会执行副作用函数
		* 如果依赖外部变量 需要添加该变量为依赖项
		
		```
		functuon View(pros){
			const [count,setCount]=useState(0);
			useEffect(()=>{
				xx
			})
			return <Text>{count}</Text>
		}
		```
		依赖项
		
		```
		functuon View(pros){
			const [count,setCount]=useState(0);
			var name ="";
			useEffect(()=>{
				const q  = `${name}=sasasa`;//使用外部变量
				
			},[name]);//务必添加依赖性  减少不必要的执行
			return <Text>{count}</Text>
		}
		
		```
		```
		资源释放
		functuon View(pros){
			function Handle(){
			}
			const [count,setCount]=useState(0);
			useEffect(()=>{
				EventEmmiter.addListener("ABCD",handle);
				return function(){
					EventEmmiter.remove("ABCD");
				}	
			})
			return <Text>{count}</Text>
		}
		
		useEffect 中返回一个函数；该函数会在下一次渲染是执行
		```
		```
		减少不必要的副作用函数
		useEffect(()=>{},[arg])
			第二个参数 表示 只有在该参数值发生变化后才重新调用副作用函数
		useEffect(()=>{},[空数组]) 只会调用一次 相当于componentDidMount
		useEffect(()=>{},[n]) n 变化是调用  相当于 shouldDidUpdate
		
		functuon View(pros){
			const [count,setCount]=useState(0);
			useEffect(()=>{
				xx
			},[count])
			return <Text>{count}</Text>
		}
		```
	* memo 相当于functiion组件中的PureComponent

		```
		const PureC = memo((props)=>{
			return div
		})
		```
	* useMemo useCallback
	
		```
		Function组件缺少mount和update 每次调用都会执行所有流程和逻辑
		useMemo useCallback 旨在解决该性能问题
		
		useMemo  缓存一个变量[函数返回值] useMemo<T>(factory: () => T, deps:): T;
		useCallback 缓存一个函数  useCallback(func,deps):func
		
		useMemo可以实现useCallback
		```
		* useMemo

			```
			function ABView({count}){
				//每次渲染时都会导致该函数的计算 及时count的值没有变化
				let expensive = fun(){//从1 ...+ count}
				return (
					<div>
						<div>{expensive}</div>
					</div>
				)
			}
			
			function ABView({count}){
				//会在第一次执行 
				//如果count没有变化 该函数是不会次被执行
				let expensive = useMemo(()=>{
					return fun(){//从1 ...+ count}
				},[count])
				return (
					<div>
						<div>{expensive}</div>
					</div>
				)
			}
			```
			
		* useCallback

			```
			function SuperView(){
				let changeName = ()=>{
				
				};
				
				let changeAge = useCallback(()=>{
					
				},[age]);
				
				return (
					<div>
						<ChildView change={changeName}/>
					</div>
				)
			}
			```
			
	* 自定义Hooks

		```
		监听网络状态
		
		function useNetStatus(){
			const [connect,setConnect] = useState(fasle)
			useEffect(()=>{
				A.addListener((connect)=>{
					setConnect(connect)
				})
				return ()=>{
					A.remove()
				}
			})
			return connect
		}
		
		function A(){
			const connect = useNetStatus;
			return (
				<Text>
					{
						connect ? "已经连接":"没有连接"
					}
				</Text>
			)
		}
		```
		
		```
		import { useEffect, useRef, useState, useCallback } from 'react'
		import { isEqual } from 'lodash'
		
		const useService = (service, params) => {
		  const prevParams = useRef(null);
		  const [callback, { loading, error, response }] = useServiceCallback(service)
		
		  useEffect(() => {
		    if (!isEqual(prevParams.current, params)) {
		      prevParams.current = params;
		      callback(params)
		    }
		  })
		
		  return { loading, error, response }
		}
		
		export const useServiceCallback = (service) => {
		  const [loading, setLoading] = useState(false)
		  const [error, setError] = useState(null)
		  const [response, setResponse] = useState(null)
		
		  // ä½¿ç¨ useCallbackï¼æ¥å¤æ­ service æ¯å¦æ¹å
		  const callback = useCallback(
		    params => {
		      setLoading(true)
		      setError(null)
		      service(params)
		        .then(response => {
		          console.log(response)
		          setLoading(false)
		          setResponse(response)
		        })
		        .catch(error => {
		          setLoading(false)
		          setError(error)
		        })
		    },
		    [service]
		  )
		
		  return [callback, { loading, error, response }]
		}
		
		export default useService
		
		
		const getList = (params)=>return Promise();
		function List (){
			const [loding,error,response] = useService(getList,{size:10});
			
			return (<div/>)
		}

		```
	
* 错误边界

	* 在子组件发生错误时 会导致整个应用无法正确加载界面
	* 错误界面 容许你在捕获异常后 处理错误

	```
	class ErrorBoundary extends React.Component {
		  constructor(props) {
		    super(props);
		    this.state = { hasError: false };
		  }
		
		 //捕获异常		
		  componentDidCatch(error, errorInfo) {
		   sst({ hasError: true })
		  }
		
		  render() {
		    if (this.state.hasError) {
		      return <h1>Something went wrong.</h1>;
		    }
		
		    return this.props.children; 
		  }
	}
	```
	