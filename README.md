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
    cropImageUrl={string}
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
+ `cropImageUrl` 裁剪图片的接口地址
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
import request from "@utils/request";
import qs from "qs";

import EigenEditor from "../src";
import Draft from './draft_func'

function setText(editorState){
    let draft = new Draft(editorState)
    let newEditorState = draft.insertText('hello world')
    return newEditorState
}

function setImage(editorState) {
    let draft = new Draft(editorState)
    let newEditorState = draft.setMedia('image', {
        src: 'http://autoimg.15feng.cn/spark-auto/c_fill/cpk/3998/24968/20170708082438670-4599-m8d3-k5ck-n190.jpg',
        type: 'image'
    })
    console.log(newEditorState)
    return newEditorState
}

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // content: 
            editorState: null,
            event: null
        }
        this.getSkuData = this.getSkuData.bind(this)
        this.focus = this.focus.bind(this)
    }

    handleChange(content, editorState) {
        console.log(content)
        // 同步编辑器里新生成的editorState
        this.setState({
            content: content,
            editorState: editorState,
            event: null
        })
    }

    focus(key) {
        console.log(key)
    }

    componentDidMount() {
        let { editorState } = this.state
        this.setState({
            event: {
                params: editorState,
                func: setImage
            }
        })
    }

    insertImageChange(imageList, setLink){
        console.log(imageList, setLink, "insertImage")
    }

    pictureRecommend(callback){
        let param = {
            query: {
                type: 'picture',
               // page: 10,
              //  size: 2,
              //  sku_version: "3.0.0"
            },
            data:[{
                intent: 44,
               // outline_type:'',
               // outline: 2,
                topic_tags: "",
                category_tags: "",
               image_shape: "all",
                query: "",
                id: "44",
                context: ""
            }]
        };
       request(`proxy/hepburn/api/v4/writing/recommend?` + qs.stringify(param.query), {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param.data)
        }).then(result => {
            callback(result);
        }).catch( err => {
            console.log(err, "err")
        })
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

    getTheText = (text) =>{
        return request('/proxy/hepburn/api/v4/writing/recommend?type=prev', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([{
            intent:45,
            category_tags: [],
            topic_tags: [],
            id:1,
            context: text,
          }])
        })
      }
    
    fomate = (res) =>{
    return res[0].prev.map((item,index)=>{
        if(index < 5){
            return item.text
        }
    })
    }

    render() {
        const editorStyle = {
            overflow: "scroll",
            width: "100%",
            display: "block",
            margin: "20px auto",
            padding: 20
        }
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
            'COLORSMODIFY',
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
            'BOTTOMMARGIN',
            'ADDTABLE',
            'RLINK',
            'LTITLE'
        ]}
        online={true} 
        autoFocus={true}
        editorStyle={editorStyle}
        // 通过传event，给编辑器插入数据
        // event是一个对象，有params和func(返回一个新的editorState)这两个属性
        // 编辑器通过执行event.func(params)来得到新的editorState
        event={this.state.event}
        focusKey={'1'}
        focus={this.focus}
        getTheText={this.getTheText}
        autocomplete={true}
        fomate={this.fomate}
        toolBarStyle={{margin: 4}}
        contentStyle={{ padding: 4, minHeight: 150 }}
        // 已废弃
        // content={this.state.content}
        getSkuData={this.getSkuData}
        pictureRecommend={this.pictureRecommend}
        uploadUrl={'/proxy/api/v1/upload/images'}
        cropImageUrl={'/proxy/api/v1/image/crop'}
        insertImageChange= {this.insertImageChange.bind(this)}
        onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root)
```
