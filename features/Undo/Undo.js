import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './Undo.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck, getUndoStatus } from '../../index'

class Undo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('UNDO') != -1 ? <IconCustom content='&#xe6a2;'
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
    </div>
  }
}

export default Undo
