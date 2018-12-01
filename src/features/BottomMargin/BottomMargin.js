import { Dropdown, Menu, Tooltip } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
import Draft_const from '../../const'

class BottomMargin extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="下标">
    <div

    >
      {
        plateform.indexOf('BOTTOMMARGIN') != -1
          ? <Dropdown
            overlay={
              <Menu
                onClick={(e) => {
                  features.bottomMargin(editorState, e.key)
                }}
              >
                {
                  Draft_const.BottomMargins.map((item, index) => {
                    return <Menu.Item key={item}>{item}</Menu.Item>
                  })
                }
              </Menu>
            }
          >
            <div>
              <IconCustom content='&#xe724;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Dropdown>
          : ''
      }
    </div>
    </Tooltip>
  }
}

export default BottomMargin
