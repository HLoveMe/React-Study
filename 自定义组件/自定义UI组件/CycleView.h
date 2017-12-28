//
//  CycleView.h
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SDCycleScrollView.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTViewManager.h>
#import <React/RCTResizeMode.h>
@interface CycleScrollView : SDCycleScrollView
@property (nonatomic, copy) RCTBubblingEventBlock onDidSelect;
@property (nonatomic, copy) RCTBubblingEventBlock onDidScroll;
@end
@interface RCTConvert (Cycle)
@end

@interface CycleView : RCTViewManager

@end

