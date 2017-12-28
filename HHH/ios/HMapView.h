//
//  HMapView.h
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTViewManager.h>
#import <React/RCTConvert+CoreLocation.h>
@interface HMapView : RCTViewManager

@end

@interface MapView : MKMapView
@property(nonatomic,copy)RCTBubblingEventBlock onUpdate;
@end
