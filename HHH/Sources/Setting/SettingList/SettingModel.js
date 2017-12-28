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
    icon=null;
    title=null;
    subTitle=null;
    component = null;
    type=null;

    constructor(icon,title,subTitle,type=AssistType.None){
        this.icon = icon;
        this.title = title;
        this.subTitle = subTitle;
        this.type=type || AssistType.None;
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
    constructor(icon,title,subTitle){
        super(icon,title,subTitle,AssistType.Arrow)
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
    constructor(icon,title,subTitle,value=false,assistCall=null){
        super(icon,title,subTitle,AssistType.Switch);
        this.assistCall=assistCall;
        this.value = value;
    }
}
export class SettingActivityModel extends SettingModel{
    animation=null;
    constructor(icon,title,subTitle,animation=false){
        super(icon,title,subTitle,AssistType.Activity);
        this.animation = animation;
    }
}