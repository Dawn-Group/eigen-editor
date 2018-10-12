import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../utils/plugins'

class UnderLine extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('UNDERLINE') != -1
          ? <IconCustom content='&#xe71b;'
            style={editorState && inlineStyleCheck(editorState).has('UNDERLINE') ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.commons(editorState, 'UNDERLINE')
            }}
          /> : ''
      }
    </div>
  }
}

export default UnderLine
