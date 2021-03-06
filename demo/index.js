import React from "react";
import ReactDOM from "react-dom";
import request from "@utils/request";
import qs from "qs";

import EigenEditor from "../src";
import Draft from './draft_func'
//import EigenEditor from "../dist"

function setText(editorState) {
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
        this.getTheEmoji = this.getTheEmoji.bind(this)
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

    getTheEmoji(){
        console.log('hfdsaga')
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

    insertImageChange(imageList, setLink) {
        console.log(imageList, setLink, "insertImage")
    }

    pictureRecommend(callback) {
        let param = {
            query: {
                type: 'picture',
                // page: 10,
                //  size: 2,
                //  sku_version: "3.0.0"
            },
            data: [{
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
        }).catch(err => {
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

    getTheText = (text) => {
        return request('/proxy/hepburn/api/v4/writing/recommend?type=prev', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                intent: 45,
                category_tags: [],
                topic_tags: [],
                id: 1,
                context: text,
            }])
        })
    }

    fomate = (res) => {
        let result = []
        for (let i = 0; i < 4; i++) {
            if (i < 5) {
                result.push(res[0].prev[i].text)
            }
        }
        return result
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
            toolBarStyle={{ margin: 4 }}
            contentStyle={{ padding: 4, minHeight: 150 }}
            // 已废弃
            // content={this.state.content}
            readOnly={false}
            getSkuData={this.getSkuData}
            keywordslist={['诗诗','凉凉']}
            getTheEmoji={this.getTheEmoji}
            pictureRecommend={this.pictureRecommend}
            uploadUrl={'/proxy/api/v1/upload/images'}
            cropImageUrl={'/proxy/api/v1/image/crop'}
            insertImageChange={this.insertImageChange.bind(this)}
            onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root)