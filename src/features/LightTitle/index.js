import React, { Component } from 'react'
import { IconCustom } from '../../features'
import {  getRedoStatus } from '../../utils/plugins'
import { Tooltip } from "antd";
class LightTitle extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="标题">
      <div>
      {
        plateform.indexOf('LTITLE') != -1 ? <IconCustom content='&#xe6c6;'
          style={{ cursor: 'pointer'}}
          onClick={(e) => {
            features.insertLightTitle(editorState)
          }}
        /> : ''
      }
    </div>
    </Tooltip>
  }
}

export default LightTitle
