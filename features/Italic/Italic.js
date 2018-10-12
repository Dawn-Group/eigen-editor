import React, { Component } from 'react'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../utils/plugins'

class Italic extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('ITALIC') != -1
          ? <IconCustom content='&#xe71a;'
            style={editorState && inlineStyleCheck(editorState).has('ITALIC') ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              features.commons(editorState, 'ITALIC')
            }}
          /> : ''
      }
    </div>
  }
}

export default Italic
