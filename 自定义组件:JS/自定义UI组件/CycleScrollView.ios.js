/**
 * Created by zhuzihao on 2017/8/4.
 */
import React, { Component, PropTypes } from 'react';

import { requireNativeComponent,NativeModules,processColor } from 'react-native';

const Cycle = requireNativeComponent("CycleView",CycleScrollView);

const { CycleView } = NativeModules;

export const Direction={
    Horizontal:CycleView.Horizontal,
    Vertical:CycleView.Vertical
};
export const ViewMode = {
    cover: CycleView.cover,  //拉伸
    contain: CycleView.contain,//保持比例 保证图片全部显示
    stretch: CycleView.stretch,//保持比例  最短边拉伸填满
    center: CycleView.center
};
export const PageStyle={
    Default:CycleView.Default,  //系统默认
    Animated:CycleView.Animated,//动画效果
    None:CycleView.None,//不显示
};
export const PageLocation={
    Right:CycleView.Right,  //居又
    Center:CycleView.Center //居中
};
export const Alignment={
    Left:CycleView.Alignment.Left,
    Center:CycleView.Alignment.Center,
    Right:CycleView.Alignment.Right,
    Justified:CycleView.Alignment.Justified,
    Natural:CycleView.Alignment.Natural

};
export class CycleScrollView extends Component{
    constructor(ops){
        super(ops);

        if(ops.PageControl && ops.PageControl.currentPageDotColor){
            ops.PageControl.currentPageDotColor =  processColor(ops.PageControl.currentPageDotColor);
        }
        if(ops.PageControl && ops.PageControl.pageDotColor){
            ops.PageControl.pageDotColor =  processColor(ops.PageControl.pageDotColor);
        }
        if(ops.labelStyle && ops.labelStyle.titleLabelTextColor){
            ops.labelStyle.titleLabelTextColor =  processColor(ops.labelStyle.titleLabelTextColor);
        }
        if(ops.labelStyle && ops.labelStyle.titleLabelBackgroundColor){
            ops.labelStyle.titleLabelBackgroundColor =  processColor(ops.labelStyle.titleLabelBackgroundColor);
        }
    }
    clearImagesCache=()=>{
        CycleView.clearImagesCache();
    };
    render(){
        return (
            <Cycle  {...this.props}
                   localizationImageNamesGroup={ this.props.localImages }
                   imageURLStringsGroup={ this.props.imageUrls }
                   infiniteLoop={ this.props.loop }
                   autoScrollTimeInterval={ this.props.interval }
                   scrollDirection={ this.props.direction }
                   bannerImageViewContentMode={ this.props.mode }
                   onDidSelect={ (e)=>{
                       if(this.props.select){
                           this.props.select(e.nativeEvent.index)
                       }
                   } }
                   onDidScroll={
                       (e)=>{
                           if(this.props.scroll){
                               this.props.scroll(e.nativeEvent.index)
                           }
                       }
                   }

            >

            </Cycle>
        );
    }
}
CycleView.propTypes={
    //网络图片数组
    imageUrls:React.PropTypes.array,
    //本地图片
    localImages:React.PropTypes.array,
    //文字数组
    titlesGroup:React.PropTypes.array,
    //是否无限循环 YES
    loop:React.PropTypes.bool,
    //每张间隔时间 2s
    interval:React.PropTypes.number,
    //是否自动滚动 YES
    autoScroll:React.PropTypes.bool,
    //滚动方向
    // Direction
    direction:React.PropTypes.number,
    //图片填充模式 ViewMode
    mode:React.PropTypes.number,
    //占位图片
    placeholder:React.PropTypes.string,

    PageControl:React.PropTypes.shape({
        // 是否显示分页控件
        showPageControl:React.PropTypes.bool,
        //只有一张时隐藏
        hidesForSinglePage:React.PropTypes.bool,
        //PageLocation
        pageControlAliment:React.PropTypes.number,
        //PageStyle
        pageControlStyle:React.PropTypes.number,
        //距离底部偏移 会在默认基础之上
        pageControlBottomOffset:React.PropTypes.number,
        //距离右偏移 会在默认基础之上
        pageControlRightOffset:React.PropTypes.number,
        //分页圆点大小
        pageControlDotSize:React.PropTypes.shape({
            width:React.PropTypes.number,
            height:React.PropTypes.number,
        }),
        //当前颜色
        currentPageDotColor:React.PropTypes.string,
        //其他的颜色
        pageDotColor:React.PropTypes.string,
        //当前图片 本地图片
        currentPageDotImage:React.PropTypes.string,
        pageDotImage:React.PropTypes.string,
    }),
    //Lable 样式
    labelStyle:React.PropTypes.shape({
        //字体颜色
        titleLabelTextColor:React.PropTypes.string,
        titleLabelTextFont:React.PropTypes.shape({
            fontName:React.PropTypes.string,
            fontSize:React.PropTypes.number
        }),
        //背景颜色
        titleLabelBackgroundColor:React.PropTypes.string,
        //Label 高度
        titleLabelHeight:React.PropTypes.number,
        //Alignment
        titleLabelTextAlignment:React.PropTypes.number,

    }),
    //事件回调
    // index
    select:React.PropTypes.func,
    scroll:React.PropTypes.func,
};
