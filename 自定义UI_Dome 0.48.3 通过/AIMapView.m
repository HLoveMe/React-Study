//
//  AIMapView.m
//  ZNZG_React
//
//  Created by 朱子豪 on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AIMapView.h"
#import <React/UIView+React.h>
@interface AIMapView()
@property(nonatomic,weak)RCTBridge * bridge;

@end
@implementation AIMapView
-(instancetype)initWithBridge:(RCTBridge *)bridge{
  if(self= [super init]){
    self.bridge = bridge;
  }
  return self;
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
  [super touchesBegan:touches withEvent:event];
  if(self.onPress){
    self.onPress(@{});
  }
}
@end
