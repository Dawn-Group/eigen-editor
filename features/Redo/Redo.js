import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'

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
