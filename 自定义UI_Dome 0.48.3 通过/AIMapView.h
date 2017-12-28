//
//  AIMapView.h
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
@interface AIMapView : UIView
-(instancetype)initWithBridge:(RCTBridge *)bridge;
//定义导出主动事件
@property(nonatomic,copy)RCTBubblingEventBlock onPress;
@property(nonatomic,copy)RCTBubblingEventBlock onTimer;
@end
