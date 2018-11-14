import React from "react";
import ReactDOM from "react-dom";
import request from "@utils/request";
import qs from "qs";

import EigenEditor from "../src";
import Draft from './draft_func'
// import EigenEditor from "../dist"

function test(data){
    let { editorState } = data
    let draft = new Draft(editorState)
    let newEditorState = draft.insertText('haha')
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
        this.insert = this.insert.bind(this)
        this.focus = this.focus.bind(this)
    }

    handleChange(content, editorState) {
        this.setState({
            content: content,
            editorState: editorState,
            event: null
        })
    }

    insert() {
        console.log('insert')

        let { editorState } = this.state
        // this.setState({
        //     event: {
        //         params: editorState,
        //         func: test
        //     }
        // })
    }

    insertImage() {
        let { editorState } = this.state

        let draft = new Draft(editorState)
        let newEditorState = draft.setMedia('image', { 
            src: '//cdn.aidigger.com/images/cars/a55edcfc8458387ab555e566e1d5fb56.jpg',
            text: 'hello'
        })
        this.setState({
            event: {
                params: newEditorState,
                func: test
            }
        })
    }

    focus(key) {
        console.log(key)
    }

    componentDidMount() {
        // this.insertImage()
        // this.insert()
        // this.insert()
        // setTimeout(() => {
        //     this.insert()
        // }, 3000)

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
            margin: "0 auto"
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
            'RLINK'
        ]}
        online={true} 
        editorStyle={editorStyle}
        event={this.state.event}
        focusKey={'1'}
        focus={this.focus}
        getTheText={this.getTheText}
        autocomplete={true}
        fomate={this.fomate}
        toolBarStyle={{margin: 4}}
        contentStyle={{ padding: 4, minHeight: 150 }}
        // content={this.state.content} 
        getSkuData={this.getSkuData}
        pictureRecommend={this.pictureRecommend}
        uploadUrl={'/proxy/api/v1/upload/images'}
        cropImageUrl={'/proxy/image/crop'}
        insertImageChange= {this.insertImageChange.bind(this)}
        onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root)