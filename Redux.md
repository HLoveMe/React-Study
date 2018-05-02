<a style="display:block;text-align:center">Redux</a>
======

```
	概览：为了统一管理应用数据流 和 处理流 维护全局state
	该state和React state 无任何关系
	
	1:Dispatch
	2:Reducer函数触发  是否更新并返回新的state
	3:如果触发更新state 就会触发到监听函数
	4:watch监听函数
```
* 原则
	* 单一Store 维持单一State树
	* State 是只读的 只能提供dispatch 修改

* Action

	```
	简单的JS对象 仅仅表示将要发生的事件状态和传递简单必要数据
		{
			type:XXX,
			ID:122
		}
	> 结构上 必须包含type字段 来标示类型
	> 数据传递
	> 涉及到的所有type 可集中分类管理
```
* Reducer

	```
	就是一个纯函数  用于处理 当前状态和当前Action。返回更新state
		> 需要自己实现函数
		> 不能修改参数
		> 必须返回state
			* 直接返回原有state
			* 复制后 在 进行更新
				Object.assign({},state,{xx:aaa})
				{...state,...}
		> 函数必须是纯计算
			*  保证多次调用结果一致
			*  不要调用网络API/路由啊 副作用API
			*  Date/random都不行		
			
		> 根据模块一层一层分割Recuder
			> 每层返回当前state 再被组装外整体
		> 每次Action都会调用树 来创建全新的state
		
	```
* Store
	
	```
		全局仅仅唯一Store对象 维持应用的 state；
		管理Action 和 所有Reducer 
		
		提供 getState() 方法获取 state；
		提供 dispatch(action) 方法更新 state；
		通过 unsubscribe = subscribe(listener) 注册监听器;
			监听数据变化
			推荐使用redux-watch中间件处理
		通过 unsubscribe() 注销监听器。		
	```
* 中间件的安装
	
	```
		npm install --save redux-thunk
		
		import { createStore, applyMiddleware } from 'redux';
		import thunk from 'redux-thunk';
	
		const store = createStore(
  			rootReducer,
		   applyMiddleware(thunk,....)
		);
			
		
	```
* 整体结构
	
	```
	types.js 管理全局 type 事件名称
		export Types={
			HomeTypes:{
				xx:00
			},
			MeetTypes={}
		}
	
	Reducers.js 总的Reducers 组装来自下级Reducer
		//每次提交Ac同都会调用这个Reducer树
		export default Reducers=function(state,action){
		
			* state 为初始状态 | 当前维护的state对象
			* 返回全新state 作为下次state参数
		
				return {
					拆分
					home:HomeReducer(state.home,action)，
					meet:
				}
		}
	
	
		export  HomeReducer = (state,action)=>{
				state 之前的home下的state
				switch(action.type){
					case SS:
						var Xs = state复制
						return {
							Xs修改/添加属性
						}
					default:
						return state
				}
			或者 再次拆分
				return {
					NewsFilter:HomeNewsFilter(state.NewsFilter,action)
					....
				}
		}
		
		export HomeNewsFilter = (state,action)=>{
			....
		}
		
	XXX.js
		
		import { createStore } from 'redux'
		export default Store = createStore(Reducers);
		
		订阅
		var unsubscribe = Store.subscribe(()=>{
			Store.getState()
			得到的State 会保留之前的所有变更 而不是 当前变更
			推荐使用redux-watch中间件处理
		})
		
		发布
			Store.dispatch(action={
				type:xx
			})
		取消:
			unsubscribe();
		
	
	```
	
* React-redux 管理整个React应用  React专用库

	```
	npm install --save react-redux
	
	组件：
		UI组件
		容器组件
	
		UI组件：
			1.就是普通的UI组件  只负责展示
			2.不负责数据逻辑 通过委托其容器组件负责处理
			3.只需要使用props 不需要使用state
			4.没有使用react-redux包装的组件  可以使用state
		
		容器组件:
			1:自动订阅State 然后进行映射 更新UI组件
			2:UI组件进行数据向内传递 , 事件向外传递
			3:尽量使用提供的函数进行包装 内部已经进行性能优化
			
		
		> 对外提供容器组件  但是仍然把它当做UI组件来使用
		> 使用react-redux, React使用Redux的某个组件再无state。所有的state 为 Redux的state
	
	编写：
		Types: 管理App所有事件类型
			export Types={
				HomeType:{
					ADD:"ADD",
					DELETE:"DELETE",
					UPDATE:"UPDATE",
				},
				或者：
				HomeType:{
					Operator:{
						ADD:"ADD",
						DELETE:"DELETE",
						UPDATE:"UPDATE",
					},
					Video:{
						Play:"Play",
						Pause:"Pause",
						End:"End"
					},
				}
				NewsType:{
				
				}
			}
		Reducer: 返回全新 state
			export default Reducers=function(state,action){
				return {
					拆分
					homeMain:HomeReducer(state.homeMain,action)，
					meetMain:
				}
			}
	
	
			export  HomeReducer = (state,action)=>{
				* state 为homeMain 下所有状态
					switch(action.type){
						case ADD:
							var Xs = state复制
							return {
								name:"ZZH"+`${Xs.type}`
								Xs修改/添加属性
							}
							state 可是是任何类型
						case DELETE:
							return {}
						default:
							return state
					}
					
				或者 再次拆分
					return {
						Operator:XXX(state.Operator,action)
						Video:ABCD(state.Video,action)
					}
			}
		
			export ABCD = (state,action)=>{
					....
			}
			
		Store:管理对象
			import { createStore } from 'redux'
			export default Store = createStore(Reducers);
			
		UI组件:
			render(){
				return (
					<View>
								接受来自外部的数据
						<Text> { this.props.title } </Text>
						<Button title={"取消"} 
								 onPress={ ()=>{
										对外进行事件传递
										this.props.ABCD(...)
								}
						}>
						</Button>
					</View>
				)
			}
			
		容器组件:
		  //数据流入
			function dataHandle(type,props){
				return ...
			}

			const  mapStateToProps=(state,pros)=>{
				//该方法的返回值 将直接更新到 UI组件的props属性上
				//state 为状态树 
				//props 父组件传递的props
				
				//根据Reducer 的层级得到 对应的state
				var newState = state.XX.OO
				return {

					data:dataHandle(newState,pros)
					show:state.XX.OO.show
				}
			}
		  
		  事件流出
		  	const mapDispatchToProps = (dispatch,pros)=>{
	   	 	// 定义的事件 会 扩展到UI组件props上
   		 	//dispatch 为Store 发布函数
		    // props
			    return {
			        ABCD:(ID)=>{
			            dispatch({
			                type:Types.HomeType.UPDATE,
			                id:ID
			            })
			        },
			        ....
			        filter:(desc)=>{
			            dispatch({
			                type:desc,
			                filter:desc
			            })
			        }
			    }
			};
		导出
			import {connect} from "react-redux"
			const  ReduxList = 		connect(mapStateToProps,mapDispatchToProps)(UI);
			export  default   ReduxList;
		
		
		外部订阅事件
			Store.subscribe(()=>{
 				var state = Store.getState();
 				
			})

	Provider:为框架提供
		为 容器组件 提供 state (mapStateToProps)
		import { Provider } from 'react-redux'
		class HAPP extends Component{
		  render(){
		    	return (
       	   		<Provider store={ Store }>
       	   			<APPRoot/>
		          </Provider>
   		 		);
  			}
		}
		AppRegistry.registerComponent('HHH', () => HAPP);

	
	数据流动：
		外部事件产生
			源数据变动             
			生成Action            
			触发Dispatch {Store.dispatch | Provider -子组件>this.props.dispatch}              
			Reducer处理           
			state改变自动mapStateToProps触发 容器组件              
			UI展示组件            
		
		内部事件产生
			前提：
				容器组件 已经定要好 数据事件
			
			mapDispatchToProps 会绑定到props中
			props.func 传递必要数据到 触发函数
			触发函数生成dispatch Action(type,data)
			
	
	增加/删除一个事件
		1：改变Types 中的定义
		2：在Reducer对应地方增加 处理
		3：修改容器组件
		4：监听 /  派发action
		
		
	React Redux 问题：
		http://cn.redux.js.org//docs/faq/ReactRedux.html
	```
	
* Redux-thunk 中间件发送异步Action

	```
		导入见 中间件
		
		发送Action是会直接发送 Ation对象
		导入该插件后 容许返回一个函数
		
		Store.dispatch((dispatch,getState)=>{
			fetch(url).then((res)=>{
				return res.json()
			}).then((json)=>{
				dispatch({
					type:"Success",
					data:json
				})
			}).catch((err)=>{
				dispacth({
					type:"Error",
					err:err
				})
			})
		})
		
	```

* redux-undo 中间件  会为你操作保存操作历史 以便回撤
* redux-watch  工具 不是中间件 监听State中的某个属性名称

	```
	Redux提供的监听方法 需要自己比较前State 和 当前State才能知道。此次派发是针对哪个Type
	
	之前：	
		Store. subscribe(()=>{
			Store.getState()
			...
		})
	使用：
		npm i --save redux-watch
		import watch from 'redux-watch'
		
		
		let AddW = watch(Store.getState,"homeMain.name监听的属性名称")
			指定监听对象
			按照Reducers层级 达到你想要监听的state/state的属性
			
		Store.subscribe(AddW((new,old,path)=>{
			仅仅在变化后才会调用
		}))
		
		比较	
	   		默认的比较方式为 ===
		   	自定义：
		   		watch(Store.getState,"",func(a,b){return bool})
	
	```
* redux-saga

	```
		比redux-thunk 强大 集中处理action副作用的操作
	```
* redux-ignore
	
	```
	
		每次派发Action 会调用这个Reducers树
		该插件可以控制调用特定
		https://github.com/omnidan/redux-ignore
	```
	
* redux-logger日志中间件