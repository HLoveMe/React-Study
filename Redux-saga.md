<a style="display:block;text-align:center">Redux-saga</a>
======

* 介绍

	```
	1：Sage是一个出路复杂的一步逻辑模块，由redux的action触发
	2： React展现数据
		Redux管理数据并绑定到React
		Sage处理业务
	3:适合比较复杂的应用  不然不需要
	```
![](redux-sage.jpg)

* Saga
	
	```
		1:属于Redux的中间件 处理复杂的异步函数
		2:监听Redux的action 来触发Saga
		3:在不确定的情况下 劲量使用try/catch。保证调试工作
			如果yield new Promise() promise如果拒绝 要经常try处理
			
		4:所有操作都需要yield调用
			yeild call
			yeild new Promise() 直到被调用
		5:不要和Redux state有太多联系 
	```
* 简单的流程
	
	```
		1:配置好Saga
		2:注册Form提交Redux的Action 
		3:Saga监听到事件  触发逻辑
		4:请求到数据 在派发给Redux
		5:Redux 绑定到React
	```

* 集成
	
	```
	1:npm install --save redux-saga
	
	2:创建sagas文件件
	
	3:UserSagas.js
		function* userLogin(acc,pwd){
			const token = yeild call(obj,acc,pwd)
			return token
		}
		
		export function* UserSaga(){
			const {acc,pwd} = yeild take("USer_login");
			const token = yeild call(userLogin,acc,pwd)
			....
		}
		//结合Redux
		import createSagaMiddleware from 'redux-saga'
		import {UserSaga} from "../Sagas/UserSagas"
		export const SagaWare = createSagaMiddleware();
		export default Store = 
		createStore(APPReducers,applyMiddleware(logger,SagaWar))
		在合适机会
		SagaWare.run(SagaWare)
		
		SagaWare = function*(){
			yield fork(AccountSaga)
			yield fork(HomeSaga)
			yield fork(...Saga)
		}
		
		AccountSaga = func* (){
			while (true){
        		const action = yield take([Types.AccountTypes.login,Types.AccountTypes.register]);
        		switch(action.type){
            		case Types.AccountTypes.login:
                			yield put({type:Types.MessageType.loadingMessage,content:"登陆中。。。"});
			                const  success = yield call(UserLogin,action);
			                yield put({type:Types.MessageType.textMessage,content:success ? "成功" : "失败"});
          			      break;
		            case Types.AccountTypes.register:
       		         break;
            		default:
                		break;
        		}
	    	}
		}
		
	```
* 非堵塞(任务)

	```
		const task = yeild fork()
		cancel(task)
	```
* 多任务
	
	```
		const [a,b] = yeild [call(),take()]	
			得到所有都执行(有一个被拒绝), 才往下执行
			
		race 开启有多个任务 ，仅仅需要一个得到结果
			import { delay } from 'redux-saga'
			
			const {posts, timeout} = yield race({
				posts   : call(fetchApi, '/posts'),
				timeout : call(delay, 1000)
  			})
  			
			如果有一个执行，就不在阻塞。并且关闭其他任务
		
 		yeild = take(["","",""])
 			得到其中一个
 		
	```
* 并发
	
	```
		takeEvery("",func,...agrs) 每次监听到 都会执行func
		
		takeLatest("",func,...agrs) 每次监听到 会把之前的取消，在执行
		
		yield throttle(500, 'INPUT_CHANGED', handleInput)控制触发间隔
		
		
		actionChannel:保证当前仅仅执行一个任务
			每次等待Request任务就会发出任务
			》func *watchR(){
				while(true){
					yeild take("Request")
					yeild call(AAAA)
				}
			}
			
			/////actionChannel/////
			》只有当任务handleRequest执行完成 才能再次触发
			import { buffers } from 'redux-saga'
			function* watchRequests() {
  				//  为 REQUEST 创建一个 actionChannel 相当于一个缓冲区
  				const requestChan = yield actionChannel('REQUEST')
  				/***
  					const requestChan = yield actionChannel('REQUEST',buffers.sliding(5))
  					默认情况紧急容许一个任务执行  这样会容易最多五个一起执行
  				*/

  				while (true) {
    				// 重 channel 中取一个 action
    				const {payload} = yield take(requestChan)
    				// 使用阻塞的方式调用 request
   					yield call(handleRequest, payload)
 				}
			}
		
			
			
			
	```
* API

	```
	let Saga = createSagaMiddleware(...sagas)
	Saga.run(RootSage,arg1,arg2...) 参数会传递到RootSaga
	
	take(ar)表示等待action触发
		> "*" 或者 "ActionName" 
		> (action)=>{
			return bool
		  }
		> ["Name1",Name2]匹配到其中一个
		const action = yeild take("Name")
	
		
	put({action})
		传递一个action到Redux 的Store
		yeild put({type:"",id:"xxx"})
		
	call(func,args) 调用某个函数
		func* A(...){return any}
		func* B(...){yeild take(...)}
		const res = yeild call(A,....)
	apply(context,[....])
	
	fork() 和call类似 但是不会阻塞
		const res = yeild call(..)
		console.log(res)
		当call完成之后才会打印res
		
		const res = yeild fork()
		console.log(res)
		res会立刻打印 res 为 任务 Task
	
	cancel 取消task
		const task = yeild fork()
		
		yeild cancel(task)
		取消后会产生SagaCancellationException
		该错误不会向上冒泡
		
	select 这是saga 和 Redux 数据交互函数
		a.js getCart = state=>state.XX.oo
		
		saga.js const cart = yield select(getCart)
		
		分开写是为了降低saga 和 redux 和耦合度；
		数据变更后 只需要修改a.js即可
	```
	
* 对外输出
	
	```
		》默认saga  是和Redux 进行搭配的
		》如果没有Redux 或者自己实现消息转发
			import { runSaga } from 'redux-saga'
			function* saga() { ... }
			const myIO = {
			  subscribe: ..., // 用于解决 take Effects
			  dispatch: ...,  // 用于解决 put Effects
			  getState: ...,  // 用于解决 select Effects
			}
		
		
		//开启saga
		runSaga(
		  saga(),
		  myIO
		)
	```
* Saga 和 rxjs组合
	
	```
	yeild UserInfoManager.loginUser(action.Account,action.PassWord).toPromise();
	```
* 数据流程

	![](./IMG_2529.JPG)
	![](./IMG_2530.JPG)
	
* Dome

	```
	export function * SystemsMessagesFunction() {
    while (true){
        let action = yield take([Types.HomeTypes.SystemMessages,Types.HomeTypes.SystemOperation]);
        switch (action.type){
            case Types.HomeTypes.SystemMessages:
                try {
                    console.log("SystemMessages")
                    yield put({
                        type:Types.MessageType.loadingMessage
                    })
                    let result = yield  NetWorkManager.GET("message/system-message",null,{rows:action.row,page:action.index}).toPromise()
                    console.log(result)
                    yield put({
                        type:Types.MessageType.MessageDismiss
                    });
                    yield put({
                        type:Types.HomeTypes.SystemMessages,
                        Messages:result.success ? result.result :{}
                    });
                }catch (err){
                    console.log("加载SystemMessages失败",err)
                }
                break;
            case Types.HomeTypes.SystemOperation:
                try{
                    console.log("SystemOperation")
                    yield put({
                        type:Types.MessageType.loadingMessage
                    });
                    let result = yield  NetWorkManager.POST("equipment/deal-bind",null,{message_id:action.id,operate:action.status ? 1 : 0}).toPromise()
                    yield put({
                        type:Types.MessageType.textMessage,
                        content:result.success ? "操作成功" : "炒作失败"
                    });
                    
                    1:这里可以直接再次Type:SystemOperation
                    2:直接会触发监听函数
                    3:而不会再次触发Saga 流程是因为 代码走到这里 并没有回到yield take([Types.HomeTypes.SystemMessages,Types.HomeTypes.SystemOperation]);
                    
                    yield put({
                        type:Types.MessageType.SystemOperation,
                        info:result.result
                    })
                }catch (err){
                    console.log("SystemOperation",err)
                }
                break;
            default:
                break
        }
    }
    
    
    
    分派任务、监听数据
    _operation = (status)=>{
        //SystemOperation
        Store.dispatch({
            type:Types.HomeTypes.SystemOperation,
            status,
            id:this.state.info.id
        });
        this.unsunb = Store.subscribe(watch(Store.getState,"HomeReducer.SystemMessages.Operation")((_new)=>{
            console.log(_new)
        }))
    }
	```