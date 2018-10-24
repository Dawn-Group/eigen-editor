import React, { Component } from 'react'
import { Input, Tooltip } from 'antd'
import classnames from 'classnames'
import './Title.css'

class Title extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { value, maxLength, placeholder, className, onChange, index, style, rules, stylerest, ...rest } = this.props
    return <div style={{ display: 'flex', ...stylerest }}>
      <Tooltip placement='topRight' title={'文章标题不能超过' + maxLength}
        visible={!!(value && value.length > maxLength)}
      >
        <Input
          className={classnames('creator-input-no-border creator-input-title', { [className]: !!className })}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          style={style}
          onChange={(e) => {
            onChange(e.target.value, index)
          }}
        />
      </Tooltip>
      <div className='valueLength'>
        <p>{value ? value.length + '/' + maxLength : ''}</p>
      </div>
    </div>
  }
}

export default Title
