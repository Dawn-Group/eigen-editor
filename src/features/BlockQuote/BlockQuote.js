import { Checkbox } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";

class BlockQuote extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="引用">
    <div>
      {
        plateform.indexOf('BLOCKQUOTE') != -1
          ? <IconCustom content='&#xe9cc;' style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.blockTypeFeatures(editorState, 'blockquote')
            }}
          />
          : ''
      }
    </div>
    </Tooltip>
  }
}

export default BlockQuote
