
//
//  HMapView.m
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "HMapView.h"
#import <CoreLocation/CoreLocation.h>

@interface HMapView()<MKMapViewDelegate>

@end
@implementation HMapView

//导入到JS
RCT_EXPORT_MODULE()


-(UIView *)view{
  MapView *map = [[MapView alloc]init];
  map.delegate = self;
  return map;
}


//属性申明
//原生属性 MKMapView 属性 供JS组件使用
RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTBubblingEventBlock)
//申明属性

//自定义属性
//MKCoordinateRegion 转换函数需要自己解决
/**
    name JS使用属性名称
    CLLocationCoordinate2D   指定最终使用的参数类型
    MKMapView  指定该UI 使用的原生组件类型
 */
RCT_CUSTOM_VIEW_PROPERTY(name, MKCoordinateRegion, MKMapView){
  //可使用的参数  json view  defaultView
  /**
    josn          JS传递数据
    view          就是 MKMapView
    defaultView   防止JS传递null时  使用defaultView 的默认属性值
   */
  
  [view setRegion:(MKCoordinateRegion){
    json ? [RCTConvert CLLocationCoordinate2D:json] : defaultView.centerCoordinate,
    {2,2}
  }];
}


-(void)mapView:(MapView *)mapView regionDidChangeAnimated:(BOOL)animated{
  if(mapView.onUpdate){
    MKCoordinateRegion region = mapView.region;
    mapView.onUpdate(@{
                 @"region": @{
                     @"latitude": @(region.center.latitude),
                     @"longitude": @(region.center.longitude),
                     @"latitudeDelta": @(region.span.latitudeDelta),
                     @"longitudeDelta": @(region.span.longitudeDelta),
                     }
          });
  }

}

@end
@implementation MapView


@end
