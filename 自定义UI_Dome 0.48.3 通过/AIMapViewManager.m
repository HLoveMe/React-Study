//
//  AIMapViewManager.m
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AIMapViewManager.h"
#import <React/RCTUIManager.h>
#import "AIMapView.h"
@implementation AIMapViewManager
//导出管理者 AIMapViewManager -> AIMapView 获取
RCT_EXPORT_MODULE();
//导出视图
-(UIView *)view{
  AIMapView *view = [[AIMapView alloc] initWithBridge:self.bridge];
  /**
     管理者是单利  在刷新之后 也不会创建
     1:不要对View 进行引用 无效的
     2:不要设置大小啥的 由js控制
   */
  return view;
}
//导出属性
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor);

//导出自定义属性操作视图 或者管理者  （可以作为一种回调）
/**
 
   属性名称
   参数类型
   默认视图类型
 */
RCT_CUSTOM_VIEW_PROPERTY(goAnimation,NSNumber,AIMapView){
  NSLog(@"--------goAnimation---已经测试成功---------");
  /** 可用参数
   json
   view    对应导出视图
   defaultView  防止json 为null  提供属性 默认值
   */
  if(json == nil){
//    view.backgroundColor = xxx
  }else{
//    view.backgroundColor = defaultView.backgroundColor;
  }
}
//导出方法  操作管理者
RCT_EXPORT_METHOD(StopOperation){
  //这里不能得到视图对象
  NSLog(@"--------StopOperation---已经测试成功---------");
//  [self xxxx]
}
//导出方法 管理者 来 操作视图
/**
 reactTag  View标示
 */
RCT_EXPORT_METHOD(moveView:(nonnull NSNumber *)reactTag
                  point:(CGPoint)point){
  //reactTag  得到视图对象
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[AIMapView class]]){
      AIMapView *_view = view;
      NSLog(@"-=-=-=-=-=-=-==-=%@",_view.reactTag);
    }else{
      RCTLogError(@"AIMapViewManager - moveView 调用失败 reactTag不能指向 AIMapView");
    }
  }];
}
//导出主动事件
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onTimer, RCTBubblingEventBlock);

@end
