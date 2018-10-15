# eigen-editor v1.0.5
The [editor-eigen](https://www.npmjs.com/package/@d6k/eigen-editor) export EigenEditor component for eigen business.

## Installation 
```
$ npm i @d6k/eigen-editor -S
$ yarn add @d6k/eigen-editor
```
## Importing
```
import EigenEditor from "@d6k/eigen-editor";
```
## Props 
```
<EigenEditor 
    plateform={string} 
    online={boolean} 
    content={object} 
    getSkuData={fn}
    onChange={fn} />
```
+ `onChange` 编辑器中内容改变时执行的回调事件，可以拿到变化后的数据对象。
+ `content` 要传入编辑器中的数据对象 注意：这个数据对象有一定的格式要求。
+ `getSkuData` 添加SKU图片连接要调用事件，事件的参数就是添加的图片url,可以在这个事件中去请求服务，将返回数据格式为插件需求的格式。
+ `plateform` 
+ `online` 

# Example  

```
import React from "react";
import ReactDOM from "react-dom";

import EigenEditor from "@d6k/eigen-editor";

class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content: JSON.parse('{"blocks":[{"key":"4paan","text":"Hello","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')
        }
    }

    handleChange(content) {
        console.log(content);
    }

    getSkuData(url) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve({
                    'price': '398.00',
                    'sku_images': '//img.alicdn.com/imgextra/i2/TB1PB8paXYM8KJjSZFuYXIf7FXa_M2.SS2',
                    'title': '小P良品铺 整张牛皮的精致 短靴女2017新款平底真皮铆钉牛皮靴子',
                    'type': 'sku2',
                    'url': 'https://item.taobao.com/item.htm?spm=a230r.1.14.22.34d544d20SAHVe&id=560966390234&ns=1&abbucket=11#detail'
                })
            }, 2)
        })
    }
    
    render(){
        return <EigenEditor plateform={'wechatFeatures'} 
        online={true} 
        content={this.state.content} 
        getSkuData={this.getSkuData}
        onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root);
```
