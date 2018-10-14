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
  UnderLine
} from '../features';

class EditorControllBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { editorState, features, plateform, className } = this.props
    return <div className={classnames('EditorControllBar', { [className]: !!className })}>
      <Undo editorState={editorState} features={features} plateform={plateform} />
      <Redo editorState={editorState} features={features} plateform={plateform} />
      <Bold editorState={editorState} features={features} plateform={plateform} />
      <Italic editorState={editorState} features={features} plateform={plateform} />
      <UnderLine editorState={editorState} features={features} plateform={plateform} />
      <AlignLeft editorState={editorState} features={features} plateform={plateform} />
      <AlignRight editorState={editorState} features={features} plateform={plateform} />
      <AlignCenter editorState={editorState} features={features} plateform={plateform} />
      <AlignJustify editorState={editorState} features={features} plateform={plateform} />
      <FontSizeModify editorState={editorState} features={features} plateform={plateform} />
      <BlockQuote editorState={editorState} features={features} plateform={plateform} />
      <SplitLine editorState={editorState} features={features} plateform={plateform} />
      <ClearAllStyles editorState={editorState} features={features} plateform={plateform} />
      <AddLink editorState={editorState} features={features} plateform={plateform} />
      <AddEmoji editorState={editorState} features={features} plateform={plateform} />
      <ColorsModify editorState={editorState} features={features} plateform={plateform} />
      <BackgroundColorModify editorState={editorState} features={features} plateform={plateform} />
      <FirstIntent editorState={editorState} features={features} plateform={plateform} />
      <InsertImage editorState={editorState} features={features} plateform={plateform} />
      <InsertSku editorState={editorState} features={features} plateform={plateform} />
      <LineHeight editorState={editorState} features={features} plateform={plateform} />
      <LetterWidth editorState={editorState} features={features} plateform={plateform} />
      <LeftRightMargin editorState={editorState} features={features} plateform={plateform} />
      <TopMargin editorState={editorState} features={features} plateform={plateform} />
      <BottomMargin editorState={editorState} features={features} plateform={plateform} />
    </div>
  }
}

export default EditorControllBar
