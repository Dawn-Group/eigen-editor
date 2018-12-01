import { Popover, Tooltip } from 'antd'
import React, { Component } from 'react'
import styles from './FontSizeModify.scss'
import { IconCustom } from '../../features'
import Draft_const from '../../const'

class FontSizeModify extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Tooltip placement="top" title="字号">
    <div>
      {
        plateform.indexOf('FONTSIZEMODIFY') != -1
          ? <Popover
            placement='bottom'
            trigger='hover'
            content={
              <div className={styles.FontBox}
              >
                {
                  Draft_const.fontSizes.map((item, index) => {
                    return <span
                      key={index}
                      className={styles.FontCard}
                      onClick={(e) => {
                        features.fontSizeModify(editorState, item)
                      }}
                    >{item}</span>
                  })
                }
                <div />
              </div>
            }
          >
            <div>
              <IconCustom content='&#xe7a1;' style={{ marginRight: '16px', cursor: 'pointer' }}
              />
            </div>
          </Popover> : ''
      }
    </div>
    </Tooltip>
  }
}

export default FontSizeModify
