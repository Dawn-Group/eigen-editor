import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../utils/plugins'
import { Tooltip } from "antd";
class UnderLine extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="下划线">
    <div>
      {
        plateform.indexOf('UNDERLINE') != -1
          ? <IconCustom content='&#xe71b;'
            style={editorState && inlineStyleCheck(editorState).has('UNDERLINE') ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.commons(editorState, 'UNDERLINE')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default UnderLine
