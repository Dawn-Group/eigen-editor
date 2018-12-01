import { Popover, Tooltip } from 'antd'
import React, { Component } from 'react'
import styles from './AddEmoji.scss'
import { IconCustom } from '../../features'
import Draft_const from '../../const'

class AddEmoji extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform } = this.props
    
    return <Tooltip placement={"top"} title={"表情"}>  
      <div>
      {
        plateform.indexOf('ADDEMOJI') != -1
          ? <Popover
            placement='bottom'
            content={
              <div className={styles.emojisBox}>
                {
                  Draft_const.emojis.map((item, index) => {
                    return <span
                      onClick={(e) => {
                        features.addEmoji(editorState, ' ' + item + ' ')
                      }}
                      key={index}
                    >{item}</span>
                  })
                }
              </div>
            }
          >
            <div>
              <IconCustom content='&#xe70e;'
                style={{ marginRight: '16px', cursor: 'pointer' }}

              />
            </div>
          </Popover> : ''
      }
    </div>
    </Tooltip>
  }
}

export default AddEmoji
