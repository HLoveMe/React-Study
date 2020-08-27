/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-03 15:11:38
 * @LastEditTime: 2019-12-03 16:17:26
 * @Author: 朱子豪
 * @Description: 
 */

import React from 'react';
import { Observer } from "mobx-react";
import { Text as RNText } from "react-native";
import { translate as Texttranslate } from '../../../src/utils/I18nUtils';

const translate = Texttranslate;

const TextDisplayName = "TranslateText"

function TranslateChildren(props) {
    let children = null;
    if (props.children) {
        if (Array.isArray(props.children)) {
            children = []
            for (let index = 0; index < props.children.length; index++) {
                let child = props.children[index];
                if (child && typeof child == 'string') {
                    children[index] = translate(child)
                } else if (child.type.displayName == TextDisplayName) {
                    children[index] = child;
                } else {
                    children[index] = child;
                }
            }
        } else {
            children = translate(props.children);
        }
    }
    return children;
}
/****
 * 
 * 支持内容直接 国际化
 */
export function Text(props) {
    let children = TranslateChildren(props);
    return (
        <Observer render={() =>
            (<RNText {...props}>{children}</RNText>)}
        />
    )
}
Text.displayName = TextDisplayName

/***
 * 
<TText style={{ fontSize: 16, color: "red" }}>
    lang_Cancel
    <TText  style={{ fontSize: 20, color: "blue",backgroundColor:"red" }}>lang_Cancel</TText>
    <Text style={{ fontSize: 20, color: "orange"}}>
        lang_Cancel
        <TText  style={{ fontSize: 20, color: "blue",backgroundColor:"red" }}>lang_Cancel</TText>
    </Text>
</TText>
 */
