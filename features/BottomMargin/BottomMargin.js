import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import styles from './BottomMargin.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Draft_const from '../../const'

class BottomMargin extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div

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
  }
}

export default BottomMargin
