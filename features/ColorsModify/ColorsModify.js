import { Popover } from 'antd'
import React, { Component } from 'react'
import styles from './ColorsModify.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Draft_const from '../../const'

class ColorsModify extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      {
        plateform.indexOf('COLORMODIFY') != -1
          ? <Popover
            overlayClassName={styles.Popover}
            placement='bottom'
            content={
              <div className={styles.colorPanel}>
                {
                  Draft_const.colors.map((item, index) => {
                    return <span
                      key={index}
                      style={{ backgroundColor: item }}
                      onClick={(e) => {
                        features.colorsModify(editorState, item)
                      }}
                    />
                  })
                }
              </div>
            }
          >
            <div>
              <IconCustom content='&#xe80e;' style={{ marginRight: '16px', cursor: 'pointer' }} />
            </div>
          </Popover>
          : ''
      }
    </div>
  }
}

export default ColorsModify
