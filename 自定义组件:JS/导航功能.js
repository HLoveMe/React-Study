
// import { NavigationActions } from "react-navigation";

// class _RouterLog {
//     //容器构造器
//     App = null;
//     //容器实例
//     _app = null;
//     //上一个路由
//     previousState = {}
//     //将要进入的路由
//     currentState = {}
//     //当前导航action
//     currentAction = {}
//     initAppRouter(app) {
//         this.App = app
//         this.getComponentForRouteName = App.router.getComponentForRouteName
//         const _this = this
//         //导航变化
//         const oldOnNavigationStateChange = App.prototype._onNavigationStateChange
//         App.prototype._onNavigationStateChange = function (...args) {
//             console.log(true, 90909090, args[0])
//             _this.previousState = args[0];
//             _this.currentState = args[1];
//             _this.currentAction = args[2];
//             _this.navigation && _this.navigation.bind(_this)(...args);
//             return oldOnNavigationStateChange.bind(this)(...args);
//         }
//         //组件挂载
//         const oldcomponentDidMount = App.prototype.componentDidMount
//         App.prototype.componentDidMount = function (...args) {
//             _this._app = this;
//             console.log(true, this, "将要出现",Object.values(this))
//             return oldcomponentDidMount.bind(this)(...args);
//         }
//         //主键卸载
//         const oldcomponentWillUnmount = App.prototype.componentWillUnmount
//         App.prototype.componentWillUnmount = function (...args) {
//             _this.App = null;
//             _this.currentState = {};
//             _this._app = null;
//             _this.currentAction = {};
//             return oldcomponentWillUnmount.bind(this)(...args);
//         }
//     }
//     //得到当前的state
//     GetState(router) {
//         if (router.routes && router.routes.length >= 1) {
//             _router = router.routes[router.index]
//             return this.GetState(_router)
//         } else {
//             return router
//         }
//     }
//     GetLastRouter(router, last = null) {
//         if (router.routes == null) {
//             return last
//         } else {
//             _router = router.routes[router.index]
//             return this.GetLastRouter(_router, router)
//         }
//     }
//     //判断是否是 即将展示的页面
//     // isNext(name,router){
//     //     _router = this.GetLastRouter(router)
//     //     return _router.routes[_router.index].routeName == name
//     // }
//     //是否存在该路由
//     isExits(name, router) {
//         _router = this.GetLastRouter(router)
//         for (var index = 0; index < _router.routes.length; index++) {
//             item = _router.routes[index]
//             if (item.routeName == name) return true
//         }
//         return false
//     }

//     navigation(previousState, nextState, action) {
//         //将要消失的组件
//         pCComp = this.App.router.getComponentForState(previousState)
//         pComponent = pCComp.WrappedComponent || pCComp;


//         //得到将要展示的组件类
//         nCComp = this.App.router.getComponentForState(nextState)
//         nComponent = nCComp.WrappedComponent || nCComp;
//         //将要进入的stats
//         CurrentStatus = this.GetState(nextState)
//         //之前的路由是否存在将要进入的页面
//         isEx = this.isExits(CurrentStatus.routeName, previousState)

//         console.log(true, pComponent.displayName, nComponent.displayName)

//         switch (action.type) {
//             case NavigationActions.NAVIGATE:
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 if (isEx) {
//                     //调用即将进入的方法
//                 } else {
//                     //
//                 }
//                 break;
//             case NavigationActions.BACK:
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             case NavigationActions.POP:
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             case NavigationActions.POP_TO_TOP:
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             case NavigationActions.RESET:
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             case "Navigation/PUSH":
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             case "goBack":
//                 if (pComponent.displayName == nComponent.displayName) { return }
//                 console.log(true, pComponent.displayName, "将要消失")
//                 console.log(true, nComponent.displayName, "将要出现")
//                 break;
//             default:
//                 break;
//         }
//     }

// }
// export default new _RouterLog()