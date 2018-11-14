import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'

class LightTitle extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('LTITLE') != -1 ? <IconCustom content='&#xe6a3;'
          onClick={(e) => {
            features.insertLightTitle(editorState)
          }}
        /> : ''
      }
    </div>
  }
}

export default LightTitle
