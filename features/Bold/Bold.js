import React, { Component } from 'react'
import styles from './Bold.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class Bold extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('BOLD') != -1
          ? <IconCustom content='&#xe718;'
            style={editorState && inlineStyleCheck(editorState).has('BOLD') ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.commons(editorState, 'BOLD')
            }}
          /> : ''
      }
    </div>
  }
}

export default Bold
