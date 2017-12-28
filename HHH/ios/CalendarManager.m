//
//  CalendarManager.m
//  HMBBF
//
//  Created by 朱子豪 on 2017/8/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <CoreLocation/CoreLocation.h>
@implementation CalendarManager

//必须实现 可以传递参数
/**
  无参数 JS 将使用类名 CalendarManager 名称
  参数就是为了取名
 */
RCT_EXPORT_MODULE();

-(instancetype)init{
  if(self=[super init]){
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(AAA) name:UIDeviceOrientationDidChangeNotification object:nil];
  }
  return self;
}
-(void)AAA{
  [self sendEventWithName:@"Change" body:@[@(111),@(222)]];
}
//这样仅仅会使用 OC 方法第一部分 addEvent 作为JS调用方法名
RCT_EXPORT_METHOD(addEvent:(NSString *)name time:(double)time end:(double)end func:(RCTResponseSenderBlock)func){
  
  func(@[@(1),@(2)]);
//  func(@[@(100),@(200)]);
}
//使用 addEventWithTime 作为Js 调用方法名 解决命名冲突
RCT_REMAP_METHOD(addEventWithTime, addEvent:(NSString*)event time:(long)time){
  
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
  return dispatch_queue_create("com.facebook.React.ZZHQueue", DISPATCH_QUEUE_SERIAL);
}

-(NSArray<NSString *> *)supportedEvents{
  
  return @[@"Change"];
}
-(NSDictionary<NSString *,id> *)constantsToExport{
  return @{
           @"left":@(Left),
           @"right":@(Right),
           @"top":@(Top),
           @"bottom":@(Bottom)
          };
}
/***
  JS
    import { NativeModules } from 'react-native';
 
    const { CalendarManager } = NativeModules;
 
 
  常量: 仅仅导出一次到JS  修改也不会改变JS端值
    - (NSDictionary *)constantsToExport{
      return @{ @"firstDayOfTheWeek": @"Monday" };
    }
 
 
 
 
 方法
  参数
    string (NSString)
    number (NSInteger, float, double, CGFloat, NSNumber)
    boolean (BOOL, NSNumber)
    array (NSArray) 包含本列表中任意类型
    object (NSDictionary) 包含string类型的键和本列表中任意类型的值
    function (RCTResponseSenderBlock)
      1: RCTConvert可以转各种支持的类型
      2: 也可以在参数类型上直接强制转换
 
  说明
    > 如果参数类型为 RCTResponseSenderBlock 那么JS 对应传递一个回调函数 。
        > 不管有多少回调函数 你必须回到一个保证内存不泄露
        > 传递的函数仅仅只能被调用一次
        > 你可以保存 在合适的地方回调
        > 需要多次回调请使用 主动通知
 
    > 参数最后两个参数为 RCTPromiseResolveBlock RCTPromiseRejectBlock 那么JS 调用 会返回一个Promise对象
 
 
 
 线程：
    > 不要假设 原生代码执行的线程
    > methodQueue 来指定 执行队列 那么所有代码都会在该队列执行
        > 框架会保留队列引用 
        > 如果你需要多个模块使用同一队列 那么你需要引用
    > 你完全可以使用 dispatch_async指定部分代码执行队列
 
 枚举：
  1：typedef NS_ENUM(NSInteger, PositionStyle) {
      Top=1,
      Left,
      Right,
      Bottom
  };
  2：扩展RCTConvert 以 支持 该枚举
  3：用常量向JS导出 constantsToExport
  4：就可以在参数中使用 枚举
 
 原生主动发送通知：

    1：类 继承 RCTEventEmitter
    2：注册支持事件名
      - (NSArray<NSString *> *)supportedEvents{
        return @[@"EventReminder"];
      }
    3：发送事件
      [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
    4：订阅
        import { NativeEventEmitter, NativeModules } from 'react-native';
        const { CalendarManager } = NativeModules;
        const calendarManagerEmitter = new NativeEventEmitter(CalendarManager);
        const subscription = calendarManagerEmitter.addListener('EventReminder',
            (reminder) => console.log(reminder.name)
        );
        //移除监听  subscription.remove();
    4：防止没有注册事件没有被监听 但是原生会一直发送
        -(void)startObserving { 注册第一个监听是调用 }
        -(void)stopObserving { 移除最后一个监听调用 }
 
 Swift:
 
 */

@end

@implementation RCTConvert (position)

RCT_ENUM_CONVERTER(PositionType, (@{
                                    @"left":@(Left),
                                    @"right":@(Right),
                                    @"top":@(Top),
                                    @"bottom":@(Bottom)
                                    }), Left, intValue);

RCT_CONVERTER(CLLocationDegrees, CLLocationDegrees, doubleValue)

@end
