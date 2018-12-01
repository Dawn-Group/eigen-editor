import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'
import { Tooltip } from "antd";
class RemoveLink extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="删除链接">
    <div>
      {
        plateform.indexOf('RLINK') != -1 ? <IconCustom content='&#xe842;' 
          style={
            getRedoStatus(editorState)
              ? { marginRight: '16px', cursor: 'pointer', color: 'black' }
              : { marginRight: '16px', cursor: 'pointer' }
          }
          onClick={(e) => {
            features.clearLink(editorState)
          }}
        /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default RemoveLink
