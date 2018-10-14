import React, { Component } from 'react'
import { IconCustom } from '../../features'

class SetTextAlign extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('SetTextAlign') != -1
          ? <div>
            <IconCustom content='&#xe6e7;' style={{ marginRight: '16px', cursor: 'pointer' }}
              onClick={(e) => {
                features.setAlign(editorState, 'left')
              }}
            />
            <IconCustom content='&#xe6e6;' style={{ marginRight: '16px', cursor: 'pointer' }}
              onClick={(e) => {
                features.setAlign(editorState, 'center')
              }}
            />
            <IconCustom content='&#xe6e5;' style={{ marginRight: '16px', cursor: 'pointer' }}
              onClick={(e) => {
                features.setAlign(editorState, 'right')
              }}
            />
            <IconCustom content='&#xe604;' style={{ marginRight: '16px', cursor: 'pointer' }}
              onClick={(e) => {
                features.setAlign(editorState, 'justify')
              }}
            />
          </div> : ''
      }
    </div>
  }
}

export default SetTextAlign
