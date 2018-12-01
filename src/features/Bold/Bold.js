import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../utils/plugins'
import { Tooltip } from "antd";
class Bold extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="加粗">
      <div>
      {
        plateform.indexOf('BOLD') != -1
          ? <IconCustom content='&#xe718;'
            style={editorState && inlineStyleCheck(editorState).has('BOLD') ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.commons(editorState, 'BOLD')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default Bold
