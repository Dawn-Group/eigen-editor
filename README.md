# eigen-editor
The [editor-eigen](https://www.npmjs.com/package/eigen-editor) export EigenEditor component for eigen business.

## Installation 
```bash
$ npm i eigen-editor --save
$ yarn add eigen-editor
```
## Importing
```js
import EigenEditor from "eigen-editor";
```
## Props 
```jsx
<EigenEditor 
    tools={array} 
    online={boolean} 
    content={object} 
    getSkuData={fn}
    editorStyle={object}
    toolBarStyle={object}
    contentStyle={object}
    uploadUrl={string}
    insertImageChange={fn}
    onChange={fn} />
```
+ `onChange` 编辑器中内容改变时执行的回调事件，可以拿到变化后的数据对象。
+ `content` 要传入编辑器中的数据对象 注意：这个数据对象有一定的格式要求。
+ `getSkuData` 添加SKU图片连接要调用事件，事件的参数就是添加的图片url,可以在这个事件中去请求服务，将返回数据格式为插件需求的格式。
+ `tools` 要添加的编辑器工具
+ `online` 是否更新编辑器内容
+ `toolBarStyle` 工具栏样式对象
+ `editorStyle` 编辑器样式对象
+ `contentStyle` 编辑区样式对象
+ `uploadUrl` 插入图片时上传图片的地址
+ `insertImageChange` 上传图片成功或切换选中图片事件

### tools 可选值
+ BOLD
+ ITALIC
+ UNDERLINE
+ UNDO
+ REDO
+ FONTSIZEMODIFY
+ BLOCKQUOTE
+ SPLITLINE
+ CLEARALLSTYLES
+ ADDLINK
+ ADDEMOJI
+ COLORSMOdDIFY
+ BACKGROUNDCOLORMODIFY
+ FIRSTINTENT
+ ALIGNCENTER
+ ALIGNLEFT
+ ALIGNRIGHT
+ ALIGNJUSTIFY
+ ADDIMG
+ ADDSKU
+ LINEHEIGHT
+ LETTERWIDTH
+ TOPMARGIN
+ LEFTRIGHTMARGIN
+ BOTTOMMARGI

# Example  

```jsx
import React from "react";
import ReactDOM from "react-dom";

import EigenEditor from "eigen-editor";

class Demo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content: JSON.parse('{"blocks":[{"key":"4paan","text":"Hello","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}')
        }
        this.getSkuData = this.getSkuData.bind(this)
    }

    handleChange(content) {
        console.log(content);
    }

    insertImageChange(imageList, setLink){
        console.log(imageList, setLink, "insertImage")
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
        return <EigenEditor tools={[
            'BOLD',
            'ITALIC',
            'UNDERLINE',
            'UNDO',
            'REDO',
            'FONTSIZEMODIFY',
            'BLOCKQUOTE',
            'SPLITLINE',
            'CLEARALLSTYLES',
            'ADDLINK',
            'ADDEMOJI',
            'COLORSMOdDIFY',
            'BACKGROUNDCOLORMODIFY',
            'FIRSTINTENT',
            'ALIGNCENTER',
            'ALIGNLEFT',
            'ALIGNRIGHT',
            'ALIGNJUSTIFY',
            'ADDIMG',
            'ADDSKU',
            'LINEHEIGHT',
            'LETTERWIDTH',
            'TOPMARGIN',
            'LEFTRIGHTMARGIN',
            'BOTTOMMARGIN'
        ]}
        online={false} 
        editorStyle={editorStyle}
        toolBarStyle={{margin: 4}}
        contentStyle={{ padding: 4 }}
        content={this.state.content} 
        getSkuData={this.getSkuData}
        uploadUrl={'http://king.com/api/v1/upload/images'}
        insertImageChange= {this.insertImageChange.bind(this)}
        onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root)
```
