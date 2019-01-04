import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { getUndoStatus } from '../../utils/plugins'
import { Tooltip} from "antd"

class Undo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement={"top"} title={"重做"}><div>
      {
        plateform.indexOf('UNDO') != -1 ? <IconCustom content='&#xe893;'
          style={
            getUndoStatus(editorState)
              ? { marginRight: '16px', cursor: 'pointer', color: 'black' }
              : { marginRight: '16px', cursor: 'pointer' }
          }
          onClick={(e) => {
            features.undo(editorState)
          }}
        /> : ''
      }
    </div></Tooltip>
  }
}

export default Undo
