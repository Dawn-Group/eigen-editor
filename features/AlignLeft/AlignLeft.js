import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './AlignLeft.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class AlignLeft extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('ALIGNLEFT') != -1
          ? <IconCustom content='&#xe6e7;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'left')
            }}
          /> : ''
      }
    </div>
  }
}

export default AlignLeft
