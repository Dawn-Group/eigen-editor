import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import styles from './LineHeight.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Draft_const from '../../const'

class LineHeight extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('LINEHEIGHT') != -1
          ? <Dropdown
            overlay={
              <Menu
                onClick={(e) => {
                  features.lineHeight(editorState, e.key)
                }}
              >
                {
                  Draft_const.LineHeights.map((item, index) => {
                    return <Menu.Item key={item}
                      style={{ width: '90px' }}>
                      {item}
                    </Menu.Item>
                  })
                }
              </Menu>
            }
          >
            <div>
              <IconCustom content='&#xe887;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Dropdown>

          : ''
      }
    </div>
  }
}

export default LineHeight
