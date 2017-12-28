/**
 * Created by zhuzihao on 2017/8/8.
 */


import { Types } from "../redux/ActionTypes"

/**
 *  参数是所有状态
 *
 *  state 值得是这里处理的Type
 * */
const  ListFilter =  (state=[],action)=>{
    switch (action.type){
        case Types.HomeActionTypes.Filter_Two:
        case Types.HomeActionTypes.Filter_There:
        case Types.HomeActionTypes.Filter_One:
        case Types.HomeActionTypes.Filter_None:
            return {
                filter:action.filter
            };
        default:
            return state
    }
};
const  delete_msg = (state,action)=> {
    switch (action.type) {
        case Types.HomeActionTypes.Delete_Msg:
            return {
                deleteID: action.id
            };
        default:
            return state;
    }
};
const GETDate=(state,action)=>{
    switch (action.type){
        case Types.HomeActionTypes.NewDataGET:
            return {
              data:`1`+`${action.text}`
            };
        default:
            return state;
    }
};

function HomeReduer(state=[],action) {
    return {
        ListFilter:ListFilter(state.ListFilter,action),
        delete:delete_msg(state.delete,action),
        GETDate:GETDate(state.GETDate,action),
    }
}

export default HomeReduer;