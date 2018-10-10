import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './FirstIntent.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class FirstIntent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('FIRSTINTENT') != -1
          ? <IconCustom content='&#xe722;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.intent(editorState, '2em')
            }}
          /> : ''
      }
    </div>
  }
}

export default FirstIntent
