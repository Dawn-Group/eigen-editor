import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";
class FirstIntent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="首行缩进">
      <div>
      {
        plateform.indexOf('FIRSTINTENT') != -1
          ? <IconCustom content='&#xe722;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.intent(editorState, '2em')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default FirstIntent
