import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
import Draft_const from '../../const'
import { Tooltip } from "antd";

class LeftRightMargin extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="左右边距">
    <div

    >
      {
        plateform.indexOf('LEFTRIGHTMARGIN') != -1
          ? <Dropdown
            overlay={
              <Menu
                onClick={(e) => {
                  features.leftRightMargin(editorState, e.key)
                }}
              >
                {
                  Draft_const.LeftRightMargins.map((item, index) => {
                    return <Menu.Item key={item}>{item}</Menu.Item>
                  })
                }
              </Menu>
            }
          >
            <div>
              <IconCustom content='&#xe63c;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Dropdown>
          : ''
      }
    </div>
    </Tooltip>
  }
}

export default LeftRightMargin
