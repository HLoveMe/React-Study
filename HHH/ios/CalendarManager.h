//
//  CalendarManager.h
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>
typedef enum {
  Top=0,
  Left,
  Right,
  Bottom
}PositionType;
@interface CalendarManager : RCTEventEmitter

@end



@interface RCTConvert (position)

@end
