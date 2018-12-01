import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";

class ClearAllStyles extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="清除样式">
    <div>
      {
        plateform.indexOf('CLEARALLSTYLES') != -1
          ? <IconCustom content='&#xe721;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.clearAllStyles(editorState)
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default ClearAllStyles
