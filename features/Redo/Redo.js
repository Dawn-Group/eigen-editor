import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './Redo.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck, getRedoStatus } from '../../index'

class Redo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('REDO') != -1 ? <IconCustom content='&#xe6a3;'
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
  }
}

export default Redo
