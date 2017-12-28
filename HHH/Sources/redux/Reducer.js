/**
 * Created by zhuzihao on 2017/8/8.
 */

import {createStore,applyMiddleware} from "redux"

import HomeReduer from "../Home/HomeReducer"
import MeetReducer from "../Meet/MeetReducer"
import { Types } from "./ActionTypes"
/**
 *  该函数是总的 Reducer接受初始化状态 和当前action
 *  返回总的State   该State 会作为所有reducer的调用参数
*/
function  APPReducer(state={},action) {
    return {
        home:HomeReduer(state.home,action),
        meet:MeetReducer(state.meet,action),
        // ....
    }
}
import thunk from 'redux-thunk';

//导出Store
export default Store = createStore(APPReducer,applyMiddleware(thunk));