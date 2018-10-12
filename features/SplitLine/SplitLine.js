import React, { Component } from 'react'
import { IconCustom } from '../../features'

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
