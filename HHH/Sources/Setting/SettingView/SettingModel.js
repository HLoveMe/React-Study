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

export class SettingModel{
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
    component = null;
    type=null;
    data=null;
    constructor(icon,title,subTitle,type=AssistType.None,data=null){
        this.icon = icon;
        this.title = title;
        this.subTitle = subTitle;
        this.type=type || AssistType.None;
        this.data=data;
        switch (this.type){
            case AssistType.Arrow:
                this.component = SettingArrowCell;
                break;
            case AssistType.None:
                this.component = SettingCell;
                break;
            case AssistType.Switch:
                this.component = SettingSwitchCell;
                break;
            case AssistType.Activity:
                this.component = SettingActivityCell;
                break;
            default:
                this.component = SettingCell;
                break;

        }
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


export class SettingGroup {
    title = null;
    items = null;
    constructor(title="section",items){
        this.title = title;
        this.items = items || [];
    }
}