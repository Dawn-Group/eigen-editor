import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'

class RemoveLink extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
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
  }
}

export default RemoveLink
