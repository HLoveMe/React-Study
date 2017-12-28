/**
 * Created by zhuzihao on 2017/8/16.
 */
import { SettingArrowCell,SettingSwitchCell,SettingCell,SettingActivityCell } from "./SettingCell"
export const AssistType={
    Arrow:"Arrow",
    Switch:"Switch",
    Activity:"Activity",
    None:"None"
};
export class BaseModel{
    //使用的组件
    component = null;
    //携带的数据
    data = null;
    constructor(component,data){
        this.component = component;
        this.data = data;
    }
}
export class SettingModel extends BaseModel{
    /**
     *  icon 图标
     *  title
     *  subTitle
     *  component 使用的cell 不需要外部指定
     *  type  辅助视图
     *  data  自定义携带的数据
     * */
    icon=null;
    title=null;
    subTitle=null;
    type=null;
    constructor(icon,title,subTitle,type=AssistType.None,data=null){
        component = null;
        _type=type || AssistType.None;
        switch (_type){
            case AssistType.Arrow:
                component = SettingArrowCell;
                break;
            case AssistType.None:
                component = SettingCell;
                break;
            case AssistType.Switch:
                component = SettingSwitchCell;
                break;
            case AssistType.Activity:
                component = SettingActivityCell;
                break;
            default:
                component = SettingCell;
                break;

        }
        super(component,data);
        this.icon = icon;
        this.title = title;
        this.subTitle = subTitle;
        this.type=_type
    }
}
//箭头
export class SettingArrowModel extends SettingModel{
    constructor(icon,title,subTitle,data=null){
        super(icon,title,subTitle,AssistType.Arrow,data)
    }
}
//辅助视图为一个开关

export class SettingSwitchModel extends SettingModel{
    assistCall=null;
    value=null;
    /**
     *     value 表示当前状态
     *     assistCall = (value)=>{
     *          value 为当前状态( 改变之后的 )
     *          return bool/Promise
     *     }
     * */
    constructor(icon,title,subTitle,value=false,assistCall=null,data=null){
        super(icon,title,subTitle,AssistType.Switch,data);
        this.assistCall=assistCall;
        this.value = value;
    }
}
export class SettingActivityModel extends SettingModel{
    animation=null;
    constructor(icon,title,subTitle,animation=false,data=null){
        super(icon,title,subTitle,AssistType.Activity,data);
        this.animation = animation;
    }
}

//组
export class SettingGroup {
    title = null;
    items = null;
    constructor(title="section",items){
        this.title = title;
        this.items = items || [];
    }
}



/**
 *  模拟使用自定义cell  自定义类型
 * */
export class CustomModel extends BaseModel{
    constructor(component,data){
        super(component,data)
    }
}
