import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './CommonFeatures.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'

class CommonFeatures extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const commonFeature = [
      {
        type: 'BOLD'
      },
      {
        type: 'ITALIC'
      },
      {
        type: 'UNDERLINE'
      }
    ]
    let { editorState, features, plateform } = this.props
    return <div>
      {
        commonFeature.map((item, index) => {
          if (plateform.indexOf(item.type) != -1) {
            switch (item.type) {
              case 'BOLD':
                return <IconCustom key={item.type} content='&#xe718;' onClick={(e) => {
                  features.commons(editorState, item.type)
                }} style={editorState && inlineStyleCheck(editorState).has(item.type) ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }} />
                break
              case 'ITALIC':
                return <IconCustom key={item.type} content='&#xe71a;' onClick={(e) => {
                  features.commons(editorState, item.type)
                }} style={editorState && inlineStyleCheck(editorState).has(item.type) ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }} />
                break
              case 'UNDERLINE':
                return <IconCustom key={item.type} content='&#xe71b;' onClick={(e) => {
                  features.commons(editorState, item.type)
                }} style={editorState && inlineStyleCheck(editorState).has(item.type) ? { marginRight: '16px', color: 'black', cursor: 'pointer' } : { marginRight: '16px', cursor: 'pointer' }} />
                break
              default:
                return ''
            }
          }
        })
      }
    </div>
  }
}

export default CommonFeatures
