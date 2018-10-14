import { Checkbox } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'

class AlignJustify extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('ALIGNJUSTIFY') != -1
          ? <IconCustom content='&#xe604;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'justify')
            }}
          /> : ''
      }
    </div>
  }
}

export default AlignJustify
