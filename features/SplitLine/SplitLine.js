import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './SplitLine.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class SplitLine extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('SPLITLINE') != -1 ? <IconCustom
          content='&#xe636;' style={{ marginRight: '16px', cursor: 'pointer' }}
          onClick={(e) => {
            features.splitLine(editorState)
          }}

        /> : ''
      }
    </div>
  }
}

export default SplitLine
