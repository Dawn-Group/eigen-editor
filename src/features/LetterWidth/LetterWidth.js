import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
import Draft_const from '../../const'
import { Tooltip } from "antd";

class LetterWidth extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="字宽"><div

    >
      {
        plateform.indexOf('LETTERWIDTH') != -1
          ? <Dropdown
            overlay={
              <Menu
                onClick={(e) => {
                  features.letterSpace(editorState, e.key)
                }}
              >
                {
                  Draft_const.LetterSpaces.map((item, index) => {
                    return <Menu.Item key={item}>{item}</Menu.Item>
                  })
                }
              </Menu>
            }
          >
            <div>
              <IconCustom content='&#xe992;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Dropdown>
          : ''
      }
    </div>
    </Tooltip>
  }
}

export default LetterWidth
