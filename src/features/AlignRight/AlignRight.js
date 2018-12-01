import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";
class AlignRight extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="右对齐">
    <div>
      {
        plateform.indexOf('ALIGNRIGHT') != -1
          ? <IconCustom content='&#xe6e5;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'right')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default AlignRight
