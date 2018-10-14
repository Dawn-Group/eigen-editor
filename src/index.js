import React, { Component } from 'react'
import styles from './theme.scss'

import { Editor, 
  AtomicBlockUtils, 
  EditorState, 
  RichUtils, 
  convertToRaw, 
  convertFromRaw, 
  CompositeDecorator, 
  Entity, 
  ContentState, 
  convertFromHTML, 
  Modifier, 
  SelectionState 
} from 'draft-js';

import {
  fontSizeModify,
  customSiteMap,
  insertBlock,
  removeAllStyles,
  wechatFeatures,
  alibabaFeatures,
  commonInlineStyle,
  undo,
  redo,
  commonBlockStyle,
  addTheLinkOnText,
  insertText,
  colorModify,
  backgroundColorModify,
  setTextAlign,
  firstIntent,
  letterSpacesModify,
  lineHeightsModify,
  leftRightMarginModify,
  topMarginModify,
  bottomMarginModify
} from '@utils/plugins';

import { 
  Title, 
  Abstract, 
  EditroControllBar, 
  Cropp 
} from '@lib';

import { Block } from '@renders/atomic'
import { blockStyleFn } from '@renders/styles/styleFn'
import { decorator } from '@renders/decorators'
import { Map } from 'immutable'

let customMap = customSiteMap()
let wechat = wechatFeatures()
let alibaba = alibabaFeatures()



const Components = {
  'title': Title,
  'author': Title,
  'introduction': Abstract,
  'abstract': Abstract,
  'manuscript': EditroControllBar
}

export default class EigenEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      liveTeXEdits: Map()
    }
    this.onChange = (editorState) => {
      this.setState({ editorState })
    }
    this.focus = this.focus.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.blockRenderer = this.blockRenderer.bind(this)

    // all features
    this.undo = this.undo.bind(this)
    this.reado = this.redo.bind(this)
    this.fontSizeModify = this.fontSizeModify.bind(this)
    this.splitLine = this.splitLine.bind(this)
    // 格式刷 not clear yet
    this.clearAllStyles = this.clearAllStyles.bind(this)
    this.addLink = this.addLink.bind(this)
    // this.clearLink = this.clearLink.bind(this)
    // this.insertBlock = this.insertBlock.bind(this)
    this.insertImage = this.insertImage.bind(this)
    this.inserSku = this.inserSku.bind(this)
    this.addEmoji = this.addEmoji.bind(this)
    this.commons = this.commons.bind(this)
    this.blockTypeFeatures = this.blockTypeFeatures.bind(this)
    this.colorsModify = this.colorsModify.bind(this)
    this.backgroundColorModify = this.backgroundColorModify.bind(this)
    this.intent = this.intent.bind(this)
    this.setAlign = this.setAlign.bind(this)
    this.letterSpace = this.letterSpace.bind(this)
    this.lineHeight = this.lineHeight.bind(this)
    this.leftRightMargin = this.leftRightMargin.bind(this)
    this.topMargin = this.topMargin.bind(this)
    this.bottomMargin = this.bottomMargin.bind(this)
    this.updateTest = this.updateTest.bind(this)
  }

  focus() {
    this.editor.focus()
  }

  blockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: Block,
        editable: false,
        props: {
          onStartEdit: (block) => {
            var { liveTeXEdits } = this.state
            let blockKey = block.getKey()
            this.setState({
              liveTeXEdits: liveTeXEdits.set(blockKey, true)
            }, () => {
              console.log(this.state.liveTeXEdits)
            })
          },
          finishChange: (newState, blockKey) => {
            this.onChange(newState)
            this.setState({
              liveTeXEdits: this.state.liveTeXEdits.remove(blockKey)
            })
          },
          notChange: (blockKey) => {
            this.setState({
              liveTeXEdits: this.state.liveTeXEdits.remove(blockKey)
            })
          },
          onclose: (blockData) => {
            var { liveTeXEdits } = this.state
            let blockKey = blockData.block.getKey()

            let content = blockData.contentState
            let block = content.getBlockForKey(blockKey)

            var targetRange = new SelectionState({
              anchorKey: blockKey,
              anchorOffset: 0,
              focusKey: blockKey,
              focusOffset: block.getLength()
            })
            var withoutSku = Modifier.removeRange(content, targetRange, 'backward')
            var resetBlock = Modifier.setBlockType(
              withoutSku,
              withoutSku.getSelectionAfter(),
              'unstyled'
            )
            var newState = EditorState.push(this.state.editorState, resetBlock, 'remove-range')
            var selectionState = EditorState.forceSelection(newState, resetBlock.getSelectionAfter())
            this.setState({
              liveTeXEdits: liveTeXEdits.set(blockKey, true)
            }, () => {
              this.onChange(selectionState)
              this.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey)
              })
            })
          },
          croppDone: (newState, blockKey) => {
            if (newState) {
              this.onChange(newState)
              this.setState({
                liveTeXEdits: this.state.liveTeXEdits.remove(blockKey)
              })
            } else {
              this.setState({
                liveTeXEdits: this.state.liveTeXEdits.remove(blockKey)
              })
            }
          }
        }
      }
    }
  }

  fontSizeModify(editorState, fontSize) {
    this.onChange(fontSizeModify(editorState, fontSize))
  }

  handleKeyCommand(command) {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  commons(editorState, style) {
    this.onChange(commonInlineStyle(editorState, style))
  }

  undo(editorState) {
    this.onChange(undo(editorState))
  }

  redo(editorState) {
    this.onChange(redo(editorState))
  }

  blockTypeFeatures(editorState, style) {
    this.onChange(commonBlockStyle(editorState, style))
  }

  splitLine(editorState) {
    let param = {
      type: 'splitline',
      obj: {}
    }
    this.onChange(insertBlock(editorState, param))
  }

  clearAllStyles(editorState) {
    this.onChange(removeAllStyles(editorState))
  }

  addLink(editorState, href) {
    this.onChange(addTheLinkOnText(editorState, href))
  }

  addEmoji(editorState, emoji) {
    this.onChange(insertText(editorState, emoji))
  }

  colorsModify(editorState, color) {
    this.onChange(colorModify(editorState, color))
  }

  backgroundColorModify(editorState, color) {
    this.onChange(backgroundColorModify(editorState, color))
  }

  setAlign(editorState, position) {
    this.onChange(setTextAlign(editorState, position))
  }

  intent(editorState, position) {
    this.onChange(firstIntent(editorState, position))
  }

  letterSpace(editorState, space) {
    this.onChange(letterSpacesModify(editorState, space))
  }

  lineHeight(editorState, space) {
    this.onChange(lineHeightsModify(editorState, space))
  }

  leftRightMargin(editorState, space) {
    this.onChange(leftRightMarginModify(editorState, space))
  }

  topMargin(editorState, space) {
    this.onChange(topMarginModify(editorState, space))
  }

  bottomMargin(editorState, space) {
    this.onChange(bottomMarginModify(editorState, space))
  }

  insertImage(editorState, param) {
    this.onChange(insertBlock(editorState, param))
  }

  uploadImageLink() {
    return '/api/v1/upload/images'
  }

  inserSku(editorState, param) {
    this.onChange(insertBlock(editorState, param))
  }

  getSkuData() {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve({
          'price': '398.00',
          'sku_images': '//img.alicdn.com/imgextra/i2/TB1PB8paXYM8KJjSZFuYXIf7FXa_M2.SS2',
          'title': '小P良品铺 整张牛皮的精致 短靴女2017新款平底真皮铆钉牛皮靴子',
          'type': 'sku2',
          'url': 'https://item.taobao.com/item.htm?spm=a230r.1.14.22.34d544d20SAHVe&id=560966390234&ns=1&abbucket=11#detail'
        })
      }, 2)
    })
  }

  updateTest(value, index) {
    this.props.dispatch({
      type: 'dashboard/updateTest',
      payload: {
        index: index,
        value: value.target.value
      }
    })
  }

  render() {
    return <div className={styles.editor}>
      <EditroControllBar
        editorState={this.state.editorState}
        features={this}
        plateform={wechat}
      />
      <div className={styles.editorBox}>
        <Editor
          customStyleMap={customMap}
          editorState={this.state.editorState}
          blockRendererFn={this.blockRenderer}
          blockStyleFn={blockStyleFn}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          ref={(element) => { this.editor = element }}
          placeholder='从这里开始写正文'
        />
      </div>
    </div>
  }
}
