/**
 * Created by zhuzihao on 2017/11/24.
 */

import React, { Component ,/**PropTypes*/} from 'react';
import PropTypes from 'prop-types';
import { processColor,EdgeInsetsPropType,ColorPropType} from 'react-native';
import { requireNativeComponent ,NativeModules,findNodeHandle} from 'react-native';

const SourceView =  requireNativeComponent("AIMapView",IOSMapView);

const  { AIMapViewManager,UIManager } = NativeModules;

export default  class  IOSMapView extends  Component{
    constructor(ops){
        super(ops)
        this.state ={
            NativeModules,SourceView,UIManager
        }
    }
    componentDidMount(){
        console.log(this.state,this.refs);
        //this.refs.SourceView  这是JS对象
        AIMapViewManager.StopOperation()//成功

        let tag = findNodeHandle(this.refs.SourceView);
        // 调用原生
        //AIMapViewManager.moveView(tag,{x:1,y:1})
        //UIManager.dispatchViewManagerCommand(tag,UIManager.AIMapView.Commands["moveView"],[{x:1,y:1}])

    }
    render(){
        return (
            <SourceView ref="SourceView" {...this.props}
                onPress = { ()=>{
                    //做自己的事
                    //向上传递事件
                    this.props.click && this.props.click()
                } }
            >
            </SourceView>
        )
    }
}
IOSMapView.defaultProps={
    backgroundColor:"blue",
    goAnimation:1,
};
IOSMapView.propTypes = {
    goAnimation:PropTypes.number,
    backgroundColor:ColorPropType,
    click:PropTypes.func.isRequired,  // 拦截事件 然后再向上传递
    //onPress:PropTypes.func.isRequired,  直接向上传递事件
    onTimer:PropTypes.func
};