import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";

class AlignLeft extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="左对齐">
    <div>
      {
        plateform.indexOf('ALIGNLEFT') != -1
          ? <IconCustom content='&#xe6e7;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'left')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default AlignLeft
