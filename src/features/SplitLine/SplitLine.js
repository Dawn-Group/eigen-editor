import React, { Component } from 'react'
import { IconCustom } from '@features'
import { Tooltip } from "antd";

class SplitLine extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="分割线">
    <div>
      {
        plateform.indexOf('SPLITLINE') != -1 ? <IconCustom
          content='&#xe88e;' style={{ marginRight: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            features.splitLine(editorState)
          }}

        /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default SplitLine
