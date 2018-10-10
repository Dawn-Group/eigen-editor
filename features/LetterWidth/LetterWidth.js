import { Dropdown, Menu } from 'antd'
import React, { Component } from 'react'
import styles from './LetterWidth.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Draft_const from '../../const'

class LetterWidth extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div

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
  }
}

export default LetterWidth
