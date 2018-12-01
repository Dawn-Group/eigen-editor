import React, { Component } from 'react'
import { IconCustom } from '@features'
import { Tooltip } from "antd";

class SplitLine extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('SPLITLINE') != -1 ? <Tooltip placement="top" title="分割线"><IconCustom
          content='&#xe636;' style={{ marginRight: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            features.splitLine(editorState)
          }}

        /></Tooltip> : ''
      }
    </div>
  }
}

export default SplitLine
