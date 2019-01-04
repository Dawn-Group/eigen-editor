import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'
import { Tooltip } from "antd";

class Redo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement={"top"} title="恢复">
      <div>
      {
        plateform.indexOf('REDO') != -1 ? <IconCustom content='&#xe610;'
          style={
            getRedoStatus(editorState)
              ? { marginRight: '16px', cursor: 'pointer', color: 'black' }
              : { marginRight: '16px', cursor: 'pointer' }
          }
          onClick={(e) => {
            features.redo(editorState)
          }}
        /> : ''
      }
      </div>
      </Tooltip>
  }
}

export default Redo
