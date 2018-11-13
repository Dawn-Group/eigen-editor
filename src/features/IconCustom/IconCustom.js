import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './IconCustom.scss'

class EditTheme extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { className, content, style, onClick } = this.props
    return <i className={classNames(styles.iconfont, { [className]: !!className })} style={style} onClick={onClick}>{content}</i>
  }
}

export default EditTheme
