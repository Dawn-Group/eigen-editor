import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import styles from './LeftRightMargin.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Draft_const from '../../const'

class LeftRightMargin extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div

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
  }
}

export default LeftRightMargin
