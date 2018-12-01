import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { Tooltip } from "antd";

class AlignCenter extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="居中">
      <div>
      {
        plateform.indexOf('ALIGNCENTER') != -1
          ? <IconCustom content='&#xe6e6;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'center')
            }}
          /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default AlignCenter
