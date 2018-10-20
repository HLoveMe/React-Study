
import { NavigationActions } from "react-navigation";

class _RouterLog {
    //容器构造器
    App = null;
    //容器实例
    _app = null;
    //上一个路由
    previousState = {}
    //将要进入的路由
    currentState = {}
    //当前导航action
    currentAction = {}
    initAppRouter(app) {
        this.App = app
        this.getComponentForRouteName = App.router.getComponentForRouteName
        const _this = this
        //导航变化
        const oldOnNavigationStateChange = App.prototype._onNavigationStateChange
        App.prototype._onNavigationStateChange = function (...args) {
            console.log(true,"路由切换",args)
            _this.previousState = args[0];
            _this.currentState = args[1];
            _this.currentAction = args[2];
            _this.navigation && _this.navigation.bind(_this)(...args);
            return oldOnNavigationStateChange.bind(this)(...args);
        }
        //组件挂载
        const oldcomponentDidMount = App.prototype.componentDidMount
        App.prototype.componentDidMount = function (...args) {
            _this._app = this;
            return oldcomponentDidMount.bind(this)(...args);
        }
        //主键卸载
        const oldcomponentWillUnmount = App.prototype.componentWillUnmount
        App.prototype.componentWillUnmount = function (...args) {
            _this.App = null;
            _this.currentState = {};
            _this._app = null;
            _this.currentAction = {};
            return oldcomponentWillUnmount.bind(this)(...args);
        }
    }
    //得到当前的state
    GetState(router) {
        if (router.routes && router.routes.length >= 1) {
            _router = router.routes[router.index]
            return this.GetState(_router)
        } else {
            return router
        }
    }
    GetLastRouter(router, last = null) {
        if (router.routes == null) {
            return last
        } else {
            _router = router.routes[router.index]
            return this.GetLastRouter(_router, router)
        }
    }
    //是否存在该路由
    isExits(name, router) {
        _router = this.GetLastRouter(router)
        for (var index = 0; index < _router.routes.length; index++) {
            item = _router.routes[index]
            if (item.routeName == name) return true
        }
        return false
    }

    navigation(previousState, nextState, action) {
        //将要消失的组件
        pCComp = this.App.router.getComponentForState(previousState)
        pComponent = pCComp.WrappedComponent || pCComp;


        //得到将要展示的组件类
        nCComp = this.App.router.getComponentForState(nextState)
        nComponent = nCComp.WrappedComponent || nCComp;
        //将要进入的stats
        CurrentStatus = this.GetState(nextState)
        //之前的路由是否存在将要进入的页面
        isEx = this.isExits(CurrentStatus.routeName, previousState)

        console.log(true, pComponent.displayName, nComponent.displayName)

        switch (action.type) {
            case NavigationActions.NAVIGATE:
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case NavigationActions.BACK:
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case NavigationActions.POP:
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case NavigationActions.POP_TO_TOP:
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case NavigationActions.RESET:
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case "Navigation/PUSH":
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            case "goBack":
                if (pComponent.displayName == nComponent.displayName) { return }
                console.log(true, pComponent.displayName, "将要消失")
                console.log(true, nComponent.displayName, "将要出现")
                break;
            default:
                break;
        }
    }

}
export default new _RouterLog()



/***
 
 

import { NavigationActions } from "react-navigation";

class _RouterLog {
    //容器构造器
    App = null;
    //容器实例
    _app = null;
    //上一个路由
    previousState = {}
    //将要进入的路由
    currentState = {}
    //当前导航action
    currentAction = {}
    //记录导航过程
    NavStatus = {
        pre:"",
        current:""
    }
    initAppRouter(App) {
        this.App = App
        this.getComponentForRouteName = App.router.getComponentForRouteName
        const _this = this
        //导航变化
        const oldOnNavigationStateChange = App.prototype._onNavigationStateChange
        App.prototype._onNavigationStateChange = function (...args) {
            _this.previousState = args[0];
            _this.currentState = args[1];
            _this.currentAction = args[2];
            _this.navigation && _this.navigation.bind(_this)(...args);
            return oldOnNavigationStateChange.bind(this)(...args);
        }
        //组件挂载
        const oldcomponentDidMount = App.prototype.componentDidMount
        App.prototype.componentDidMount = function (...args) {
            _this._app = this;
            debugger
            return oldcomponentDidMount.bind(this)(...args);
        }
        //主键卸载
        const oldcomponentWillUnmount = App.prototype.componentWillUnmount
        App.prototype.componentWillUnmount = function (...args) {
            _this.App = null;
            _this.currentState = {};
            _this._app = null;
            _this.currentAction = {};
            return oldcomponentWillUnmount.bind(this)(...args);
        }
    }
    getComponentName(component){
        name = `${component}`
        return name.substring(name.indexOf(" ") + 1,name.indexOf("("))
    }
    getSourceComponent(Com){
        if(Com.WrappedComponent){
            return this.getSourceComponent(Com.WrappedComponent)
        }else{
            return Com
        }
    }
    navigation(previousState, nextState, action) {
        if(action.type == "Navigation/COMPLETE_TRANSITION")return;
        //将要消失的组件
        pCComp = this.App.router.getComponentForState(previousState)
        pComponent = this.getSourceComponent(pCComp)
        //得到将要展示的组件类A
        nCComp = this.App.router.getComponentForState(nextState)
        nComponent = this.getSourceComponent(nCComp)
        //
        // pre = this.getComponentName(pComponent)
        // current = this.getComponentName(nComponent)
        
        // debugger
        this.NavStatus.pre = this.getComponentName(pComponent)
        this.NavStatus.current = this.getComponentName(nComponent)
        console.log("路由切换",this.NavStatus)
    }
}
export const Router = new _RouterLog(); 
 



 */