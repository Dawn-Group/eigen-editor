import React, { Component } from 'react'
import { IconCustom } from '../../features'

class AlignRight extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('ALIGNRIGHT') != -1
          ? <IconCustom content='&#xe6e5;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.setAlign(editorState, 'right')
            }}
          /> : ''
      }
    </div>
  }
}

export default AlignRight
