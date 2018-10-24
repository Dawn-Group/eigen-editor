import React, { Component } from 'react'
import './style.css'
import classnames from 'classnames'
import {
  Undo,
  Redo,
  FontSizeModify,
  SplitLine,
  ClearAllStyles,
  BlockQuote,
  AddLink,
  AddEmoji,
  AlignCenter,
  AlignRight,
  AlignLeft,
  AlignJustify,
  ColorsModify,
  BackgroundColorModify,
  FirstIntent,
  InsertImage,
  InsertSku,
  LineHeight,
  LetterWidth,
  LeftRightMargin,
  TopMargin,
  BottomMargin,
  Bold,
  Italic,
  UnderLine,
  InsertTable
} from '../features';

class EditorControllBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { className } = this.props
    return <div className={classnames('EditorControllBar', { [className]: !!className })}>
      <Undo {...this.props} />
      <Redo {...this.props} />
      <Bold {...this.props} />
      <Italic {...this.props} />
      <UnderLine {...this.props} />
      <AlignLeft {...this.props} />
      <AlignRight {...this.props} />
      <AlignCenter {...this.props} />
      <AlignJustify {...this.props} />
      <FontSizeModify {...this.props} />
      <BlockQuote {...this.props} />
      <SplitLine {...this.props} />
      <ClearAllStyles {...this.props} />
      <AddLink {...this.props} />
      <AddEmoji {...this.props} />
      <ColorsModify {...this.props} />
      <BackgroundColorModify {...this.props} />
      <FirstIntent {...this.props} />
      <InsertImage {...this.props} />
      <InsertSku {...this.props} />
      <LineHeight {...this.props} />
      <LetterWidth {...this.props} />
      <LeftRightMargin {...this.props} />
      <TopMargin {...this.props} />
      <BottomMargin {...this.props} />
      <InsertTable {...this.props} />
    </div>
  }
}

export default EditorControllBar
