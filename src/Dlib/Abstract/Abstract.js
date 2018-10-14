import React, { Component } from 'react'
import { Input } from 'antd'
import classnames from 'classnames'
import './Abstract.css'
const { TextArea } = Input

class Abstract extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { value, maxLength, placeholder, className, maxrow, minrow, onChange, index, style, stylerest, ...rest } = this.props
    return <div style={{ display: 'flex', ...stylerest}}><TextArea
      className={classnames('creator-input-introduction', { [className]: !!className })}
      autosize={{ maxRows: 4, minRows: 4 }}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      style={style}
      onChange={(e) => {
        onChange(e.target.value, index)
      }}
    /><div className='valueLength'><p>{value ? value.length + '/' + maxLength : ''}</p></div></div>
  }
}

export default Abstract
