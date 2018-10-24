import React from "react";
import ReactDOM from "react-dom";

import EigenEditor from "../src/index";

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
            'BOTTOMMARGIN',
            'ADDTABLE'
        ]}
        online={false} 
        editorStyle={editorStyle}
        toolBarStyle={{margin: 4}}
        contentStyle={{ padding: 4, minHeight: 150 }}
        content={this.state.content} 
        getSkuData={this.getSkuData}
        onChange={this.handleChange.bind(this)} />
    }
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Demo />, root)