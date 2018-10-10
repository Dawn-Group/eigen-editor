import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './AlignCenter.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class AlignCenter extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('ALIGNCENTER') != -1
          ? <IconCustom content='&#xe6e6;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'center')
            }}
          /> : ''
      }
    </div>
  }
}

export default AlignCenter
