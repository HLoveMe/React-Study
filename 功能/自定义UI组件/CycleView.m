//
//  CycleView.m
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CycleView.h"
@implementation CycleScrollView
@end
@implementation RCTConvert (Cycle)
RCT_ENUM_CONVERTER(UICollectionViewScrollDirection, (@{
            @"Horizontal":@(UICollectionViewScrollDirectionHorizontal),
            @"Vertical":@(UICollectionViewScrollDirectionVertical),
            }), UICollectionViewScrollDirectionHorizontal, integerValue);

//这两个枚举 没有最为函数参数传入 不需要注册  仅仅作为常量导出即可
//RCT_ENUM_CONVERTER(SDCycleScrollViewPageContolStyle, (@{
//                    @"Default":@(SDCycleScrollViewPageContolStyleClassic),
//                    @"Animated":@(SDCycleScrollViewPageContolStyleAnimated),
//                    @"None":@(SDCycleScrollViewPageContolStyleNone)
//                                        }),SDCycleScrollViewPageContolStyleClassic, intValue);
//
//RCT_ENUM_CONVERTER(SDCycleScrollViewPageContolAliment, (@{
//                   @"Right":@(SDCycleScrollViewPageContolAlimentRight),
//                   @"Center":@(SDCycleScrollViewPageContolAlimentCenter),
//                                                        }),SDCycleScrollViewPageContolAlimentCenter, intValue);

@end

@interface CycleView()<SDCycleScrollViewDelegate>

@end
@implementation CycleView
RCT_EXPORT_MODULE()

//图片数据源
RCT_EXPORT_VIEW_PROPERTY(imageURLStringsGroup, NSArray)
//文字数据源
RCT_EXPORT_VIEW_PROPERTY(titlesGroup, NSArray)
//本地图片数据源
RCT_EXPORT_VIEW_PROPERTY(localizationImageNamesGroup, NSArray)
//
//
//是否无限循环
RCT_EXPORT_VIEW_PROPERTY(infiniteLoop, BOOL)
//自动播放间隔
RCT_EXPORT_VIEW_PROPERTY(autoScrollTimeInterval, CGFloat)
//是否无限滚动
RCT_EXPORT_VIEW_PROPERTY(autoScroll, BOOL)
////滚动方向
RCT_EXPORT_VIEW_PROPERTY(scrollDirection, UICollectionViewScrollDirection)

//图片Mode
RCT_EXPORT_VIEW_PROPERTY(bannerImageViewContentMode, RCTResizeMode)
//占位图 本地图片
RCT_CUSTOM_VIEW_PROPERTY(placeholder, NSString, CycleScrollView){
  NSString * imName =  [RCTConvert NSString:json];
  UIImage *placeholder = [UIImage imageNamed:imName];
  if(placeholder){
    view.placeholderImage = placeholder;
  }
}
//分页控件
RCT_CUSTOM_VIEW_PROPERTY(PageControl, NSDictionary, CycleScrollView){
  
  NSDictionary *page = [RCTConvert NSDictionary:json];
  NSArray *keys = [page allKeys];
  view.showPageControl = [page[@"showPageControl"] boolValue];
  view.hidesForSinglePage = [page[@"hidesForSinglePage"] boolValue];
  view.pageControlAliment = [page[@"pageControlAliment"] intValue];
  view.pageControlStyle = [page[@"pageControlStyle"] intValue];
  
  if([keys containsObject:@"pageControlBottomOffset"]){
    CGFloat offset = [RCTConvert CGFloat:page[@"pageControlBottomOffset"]];
    view.pageControlBottomOffset=offset;
  }
  if([keys containsObject:@"pageControlRightOffset"]){
    CGFloat offset = [RCTConvert CGFloat:page[@"pageControlRightOffset"]];
    view.pageControlRightOffset=offset;
  }
  if([keys containsObject:@"pageControlDotSize"]){
    CGSize size = [RCTConvert CGSize:page[@"pageControlDotSize"]];
    view.pageControlDotSize=size;
  }
  if([keys containsObject:@"currentPageDotColor"]){
    UIColor *cu  = [RCTConvert UIColor:page[@"currentPageDotColor"]];
    view.currentPageDotColor=cu ? cu : defaultView.currentPageDotColor;;
  }
  if([keys containsObject:@"pageDotColor"]){
    UIColor *cu  = [RCTConvert UIColor:page[@"pageDotColor"]];
    view.pageDotColor=cu ? cu : defaultView.pageDotColor;
  }
  if([keys containsObject:@"currentPageDotImage"]){
    NSString *cu  = [RCTConvert NSString:page[@"currentPageDotImage"]];
    UIImage *img = [UIImage imageNamed:cu];
    if(img){
      view.currentPageDotImage=img;
    }
  }
  if([keys containsObject:@"pageDotImage"]){
    NSString *cu  = [RCTConvert NSString:page[@"pageDotImage"]];
    UIImage *img = [UIImage imageNamed:cu];
    if(img){
      view.pageDotImage=img;
    }
  }
}
RCT_CUSTOM_VIEW_PROPERTY(labelStyle, NSDictionary, CycleScrollView){
  NSDictionary *page = [RCTConvert NSDictionary:json];
  NSArray *keys = [page allKeys];
  if([keys containsObject:@"titleLabelTextColor"]){
    UIColor *cu  = [RCTConvert UIColor:page[@"titleLabelTextColor"]];
    view.titleLabelTextColor=cu ? cu : defaultView.titleLabelTextColor;
  }
  if([keys containsObject:@"titleLabelBackgroundColor"]){
    UIColor *cu  = [RCTConvert UIColor:page[@"titleLabelBackgroundColor"]];
    view.titleLabelBackgroundColor=cu ? cu : defaultView.titleLabelBackgroundColor;;
  }
  if([keys containsObject:@"titleLabelTextFont"]){
    
    NSDictionary *cu = [RCTConvert NSDictionary:page[@"titleLabelTextFont"]];
    NSString *name = cu[@"fontName"];
    CGFloat size = [cu[@"fontSize"] doubleValue];
    view.titleLabelTextFont = name ? [UIFont fontWithName:name size:size] : [UIFont systemFontOfSize:size];

  }
  if([keys containsObject:@"titleLabelHeight"]){
    CGFloat offset = [RCTConvert CGFloat:page[@"titleLabelHeight"]];
    view.titleLabelHeight=offset;
  }
  if([keys containsObject:@"titleLabelTextAlignment"]){
    view.titleLabelTextAlignment = [[RCTConvert NSNumber:page[@"titleLabelTextAlignment"]] intValue];
  }
}


////点击回调
RCT_EXPORT_VIEW_PROPERTY(onDidSelect, RCTBubblingEventBlock)
////滚动回调
RCT_EXPORT_VIEW_PROPERTY(onDidScroll, RCTBubblingEventBlock)

// JS 调用
RCT_EXPORT_METHOD(clearImagesCache){
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    [SDCycleScrollView clearImagesCache];
  });
}

//组件执行队列
-(dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}
-(NSDictionary<NSString *,id> *)constantsToExport{
  return @{
           //滚动方向
           @"Horizontal":@(UICollectionViewScrollDirectionHorizontal),
           @"Vertical":@(UICollectionViewScrollDirectionVertical),
           //图片显示模式
           @"cover": @(UIViewContentModeScaleAspectFill),
           @"contain": @(UIViewContentModeScaleAspectFit),
           @"stretch": @(UIViewContentModeScaleToFill),
           @"center": @(UIViewContentModeCenter),
           
           //page指示器样式
           @"Default":@(SDCycleScrollViewPageContolStyleClassic),
           @"Animated":@(SDCycleScrollViewPageContolStyleAnimated),
           @"None":@(SDCycleScrollViewPageContolStyleNone),
           //page指示器样式位置
           @"Right":@(SDCycleScrollViewPageContolAlimentRight),
           @"Center":@(SDCycleScrollViewPageContolAlimentCenter),
           
           //Label 文字对齐方式
           @"Alignment":@{
               @"Left":@(NSTextAlignmentLeft),
               @"Center":@(NSTextAlignmentCenter),
               @"Right":@(NSTextAlignmentRight),
               @"Justified":@(NSTextAlignmentJustified),
               @"Natural":@(NSTextAlignmentNatural)
              }
        };
}
-(UIView *)view{
  CycleScrollView *view = [[CycleScrollView alloc]init];
  view.delegate = self;
  return view;
}
#pragma -mark 代理
- (void)cycleScrollView:(CycleScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index{
      if(cycleScrollView.onDidSelect){
          cycleScrollView.onDidSelect(@{@"index":@(index)});
      }
}
- (void)cycleScrollView:(CycleScrollView *)cycleScrollView didScrollToIndex:(NSInteger)index{
    if(cycleScrollView.onDidScroll){
      cycleScrollView.onDidScroll(@{@"index":@(index)});
    }
}

@end
