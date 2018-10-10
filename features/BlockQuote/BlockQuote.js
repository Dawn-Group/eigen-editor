import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './BlockQuote.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class BlockQuote extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('BLOCKQUOTE') != -1
          ? <IconCustom content='&#xe9cc;' style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.blockTypeFeatures(editorState, 'blockquote')
            }}
          />
          : ''
      }
    </div>
  }
}

export default BlockQuote
