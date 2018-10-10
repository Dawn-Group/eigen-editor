import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './ClearAllStyles.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class ClearAllStyles extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('CLEARALLSTYLES') != -1
          ? <IconCustom content='&#xe721;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.clearAllStyles(editorState)
            }}
          /> : ''
      }
    </div>
  }
}

export default ClearAllStyles
