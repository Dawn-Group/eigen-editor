import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
import Draft_const from '../../const'

class TopMargin extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div

    >
      {
        plateform.indexOf('TOPMARGIN') != -1
          ? <Dropdown
            overlay={
              <Menu
                onClick={(e) => {
                  features.topMargin(editorState, e.key)
                }}
              >
                {
                  Draft_const.TopMargins.map((item, index) => {
                    return <Menu.Item key={item}>{item}</Menu.Item>
                  })
                }
              </Menu>
            }
          >
            <div>
              <IconCustom content='&#xe67e;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Dropdown>
          : ''
      }
    </div>
  }
}

export default TopMargin
