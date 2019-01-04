import React, { Component } from 'react'
import styles from './theme.scss'
import {
  Editor,
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
  SelectionState,
  getDefaultKeyBinding
} from 'draft-js';
import request from './utils/request'
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
  bottomMarginModify,
  removeTheLink,
  lightTitle,
} from '@utils/plugins';
import { Mentions, getSelect, res } from '@utils/mention'
import { Block } from '@renders/atomic'
import { blockStyleFn } from '@renders/styles/styleFn'
import { decorator } from '@renders/decorators'
import { Map } from 'immutable';
import EditroControllBar from './tool-bar';
import { checkPropTypes } from 'prop-types';

export default class EigenEditor extends Component {
  constructor(props) {
    super(props)
    this.typeaheadState = null
    this.state = {
      shift: null,
      editorState: EditorState.createEmpty(decorator),
      liveTeXEdits: Map(),
      features: {
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
      },
      autocompleteState: null,
      textFor: '',
      onenter: null,
      res: [],
      type: '',
      emojikey: ''
    }
    this.onChange = (editorState) => {
      this.setState({ editorState }, () => {
        this.props.onChange(convertToRaw(editorState.getCurrentContent()), editorState)
        if (this.props.autocomplete) {
          window.requestAnimationFrame(() => {
            this.onAutocompleteChange(this.getTypeaheadState());
          })
        }
      })
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
    this.clearLink = this.clearLink.bind(this)
    // this.insertBlock = this.insertBlock.bind(this)
    this.insertLightTitle = this.insertLightTitle.bind(this)
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

    /////
    this.hasEntityAtSelection = this.hasEntityAtSelection.bind(this)
    this.onAutocompleteChange = this.onAutocompleteChange.bind(this)
    this.renderAutoComplete = this.renderAutoComplete.bind(this)
    this.getTheRes = this.getTheRes.bind(this)
    this.pasteText = this.pasteText.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.blur = this.blur.bind(this)
  }

  renderAutoComplete() {
    if (this.state.autocompleteState === null) {
      return null
    } else {
      return <Mentions
        {...this.state.autocompleteState}
        type={this.state.type}
        textFor={this.state.textFor}
        onenter={this.state.onenter}
        getTheRes={this.getTheRes}
        getTheText={this.props.getTheText}
        fomate={this.props.fomate}
        getTheEmoji={this.props.getTheEmoji}
        emojikey={this.state.emojikey}
        getHalf={this.props.getHalf}
      />
    }
  }

  blur() {
    this.setState({
      autocompleteState: null
    })
  }

  getTheRes(res) {
    this.setState({
      res: res
    })
  }

  onAutocompleteChange(autocompleteState) {
    this.setState({
      autocompleteState
    })
  }

  hasEntityAtSelection() {
    let { editorState } = this.state
    const selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      return false;
    }

    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    return !!block.getEntityAt(selection.getStartOffset() - 1);
  }

  getTypeaheadRange = () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      return null;
    }

    if (this.hasEntityAtSelection()) {
      return null;
    }

    const range = selection.getRangeAt(0);
    let text = range.startContainer.textContent;
    let alltext = this.state.editorState.getCurrentContent().getPlainText()

    // Remove text that appears after the cursor..
    text = text.substring(0, range.startOffset);
    let checktext = text.slice(-10)
    let startp = 0
    if (alltext.indexOf(checktext) + checktext.length - 200 < 0) {
      startp = 0
    } else {
      startp = alltext.indexOf(checktext) + checktext.length - 200
    }
    this.setState({
      textFor: alltext.slice(startp, alltext.indexOf(checktext) + checktext.length)
    })
    // ..and before the typeahead token.
    let index = -1
    if (text && [text.length - 1] && /\.|\。|\？|\?|\!|\！|\~|\～/g.test(text[text.length - 1])) {
      this.setState({
        type: 'text'
      })
      index = text.length - 1
    }
    if (text && this.props.keywordslist && this.props.keywordslist.indexOf(text.substr(-2)) > -1 || this.props.keywordslist.indexOf(text.substr(-3)) > -1) {
      let emojikey = ''
      if (this.props.keywordslist.indexOf(text.substr(-2)) > -1) {
        emojikey = text.substr(-2)
      }
      if (this.props.keywordslist.indexOf(text.substr(-3)) > -1) {
        emojikey = text.substr(-3)
      }
      this.setState({
        type: 'image',
        emojikey: emojikey
      })
      index = text.length - 1
    }
    if (index === -1) {
      return null;
    }

    text = text.substring(index);

    return {
      text: text,
      start: index,
      end: range.startOffset
    };
  }

  getHalf = () => {
    const selection = window.getSelection()

    if (selection.rangeCount === 0) {
      return null
    }

    if (this.hasEntityAtSelection()) {
      return null
    }

    const range = selection.getRangeAt(0);
    let text = range.startContainer.textContent;
    text = text.substring(0, range.startOffset);
    let index = -1

    this.setState({
      type: 'half'
    })

    index = text.length - 1

    if (index === -1) {
      return null;
    }
    return {
      text: text,
      start: index,
      end: range.startOffset
    };
  }

  getTypeaheadState(invalidate = true) {
    if (!invalidate) {
      return this.typeaheadState;
    }

    const typeaheadRange = this.getTypeaheadRange();
    if (!typeaheadRange) {
      this.typeaheadState = null;
      return null;
    }

    const tempRange = window.getSelection().getRangeAt(0).cloneRange();
    tempRange.setStart(tempRange.startContainer, typeaheadRange.start);
    const rangeRect = tempRange.getBoundingClientRect();
    let [left, top] = [rangeRect.left, rangeRect.bottom];

    this.typeaheadState = {
      left,
      top,
      text: typeaheadRange.text,
      selectedIndex: 0
    };
    return this.typeaheadState;
  }

  getHalfState(invalidate = true) {
    if (!invalidate) {
      return this.typeaheadState;
    }

    const typeaheadRange = this.getHalf();
    if (!typeaheadRange) {
      this.typeaheadState = null;
      return null;
    }

    const tempRange = window.getSelection().getRangeAt(0).cloneRange();
    tempRange.setStart(tempRange.startContainer, typeaheadRange.start);
    const rangeRect = tempRange.getBoundingClientRect();
    let [left, top] = [rangeRect.left, rangeRect.bottom];

    this.typeaheadState = {
      left,
      top,
      text: typeaheadRange.text,
      selectedIndex: 0
    };
    return this.typeaheadState;
  }

  onUpArrow = (e) => {
    if (this.state.autocompleteState) {
      let typeaheadState = this.getTypeaheadState(false);
      e.preventDefault();
      typeaheadState.selectedIndex += -1;
      if (typeaheadState.selectedIndex === -1) {
        typeaheadState.selectedIndex = this.state.res.length - 1
      }
      this.typeaheadState = typeaheadState;
      this.setState({
        autocompleteState: this.typeaheadState,
      })
    }
  }

  onDownArrow = (e) => {
    if (this.state.autocompleteState) {
      let typeaheadState = this.getTypeaheadState(false);
      e.preventDefault();
      typeaheadState.selectedIndex += 1;
      if (typeaheadState.selectedIndex === this.state.res.length) {
        typeaheadState.selectedIndex = 0
      }
      this.typeaheadState = typeaheadState;
      this.setState({
        autocompleteState: this.typeaheadState,
      })
    }
  }

  onRightArrow = (e) => {
    if (this.state.autocompleteState) {
      let newstate = getSelect(this.state.editorState, this.state.res[0], this.state.type)
      this.onChange(newstate)
      this.setState({
        autocompleteState: null,
        onenter: null
      })
    }
  }

  handleReturn = () => {
    if (this.state.autocompleteState) {
      if (this.props.autocomplete) {
        let newstate = getSelect(this.state.editorState, this.state.res[this.state.autocompleteState.selectedIndex], this.state.type)
        this.onChange(newstate)
        this.setState({
          autocompleteState: null,
          onenter: null
        })
      }
    }
  }

  keyBindingFn(e) {
    if (e && e.keyCode && e.keyCode == '16') {
      return 'AutoComplete'
    }
    if (e && e.keyCode && e.keyCode == '187' && this.state.autocompleteState) {
      return 'cancleComplete'
    }
    if (e && e.keyCode && e.keyCode == '17') {
      return 'halfnext'
    }
    return getDefaultKeyBinding(e)
  }


  ////////////////

  clearLink(editorState) {
    this.onChange(removeTheLink(editorState))
  }

  insertLightTitle(editorState) {
    this.onChange(lightTitle(editorState))
  }

  focus() {
    this.editor.focus()
    if (this.props.focus) {
      this.props.focus(this.props.focusKey)
    }
  }

  componentDidMount() {
    const { content, autoFocus } = this.props;
    content && this.onChange(EditorState.createWithContent(convertFromRaw(content), decorator))
    if (autoFocus) {
      this.focus()
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.event) {
      let newState = nextprops.event.func(nextprops.event.params)
      this.onChange(newState)
    }
  }

  blockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: Block,
        editable: false,

        props: {
          cropImageLink: this.cropImageLink.bind(this),
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
    if (command == 'AutoComplete') {
      this.handleReturn()
      return 'handled'
    } else if (command == 'cancleComplete') {
      this.setState({
        autocompleteState: null
      })
    } else if (command == 'halfnext') {
      this.onAutocompleteChange(this.getHalfState())
    } else {
      const { editorState } = this.state
      const newState = RichUtils.handleKeyCommand(editorState, command)
      if (newState) {
        this.onChange(newState)
        return true
      }
      return false
    }
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

  insertTable(editorState, param) {
    this.onChange(insertBlock(editorState, param))
  }

  uploadImageLink() {
    let { uploadUrl } = this.props
    return uploadUrl || '/proxy/api/v1/upload/images';
  }

  cropImageLink() {
    let { cropImageUrl } = this.props
    return cropImageUrl || '/proxy/image/crop';
  }

  inserSku(editorState, param) {
    this.onChange(insertBlock(editorState, param))
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

  pasteText(text, html) {
    if (html) {
      let newstate = this.state.editorState
      const blocksFromHTML = convertFromHTML(html)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      let obj = convertToRaw(state)
      for (let i in obj.blocks) {
        newstate = insertText(newstate, obj.blocks[i].text)
        if (obj.blocks[i].entityRanges.length) {
          for (let k in obj.blocks[i].entityRanges) {
            if (obj.entityMap[obj.blocks[i].entityRanges[k].key].type === 'IMAGE') {
              let param = {
                type: 'image',
                obj: {
                  src: obj.entityMap[obj.blocks[i].entityRanges[k].key].data.src
                }
              }
              newstate = insertBlock(newstate, param)
            }
          }
        }
      }
      this.onChange(newstate)
      return 'handled'
    } else if (text && (text.indexOf('taobao') > -1 || text.indexOf('tmall') > -1 || text.indexOf('yao') > -1)) {
      this.props.getSkuData(text).then(res => {
        let param = {
          type: 'sku',
          obj: { type: 'sku', url: text, ...res }
        }
        this.inserSku(this.state.editorState, param)
      }).catch(() => {
        return 'not-handled'
      })
      return 'handled'
    } else {
      return 'not-handled'
    }
  }


  render() {
    const { features } = this.state;
    const {
      tools: plateform,
      getSkuData,
      pictureRecommend,
      editorStyle,
      contentStyle,
      toolBarStyle,
      focusKey,
      insertImageChange
    } = this.props;
    return <div style={editorStyle}>
      {plateform && plateform.length > 0 && <EditroControllBar
        editorState={this.state.editorState}
        features={this}
        style={toolBarStyle}
        pictureRecommend={pictureRecommend}
        getSkuData={getSkuData}
        insertImageChange={insertImageChange}
        plateform={plateform}
      />}
      {this.renderAutoComplete()}
      <div style={contentStyle} className={styles.editor} onClick={this.focus}>
        <Editor
          customStyleMap={features['customSiteMap']()}
          editorState={this.state.editorState}
          blockRendererFn={this.blockRenderer}
          blockStyleFn={blockStyleFn}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          ref={(element) => { this.editor = element }}
          readOnly={this.state.liveTeXEdits.count()}
          placeholder='从这里开始写正文'
          onBlur={this.blur}
          onUpArrow={this.onUpArrow}
          handlePastedText={this.pasteText}
          onDownArrow={this.onDownArrow}
          onRightArrow={this.onRightArrow}
          keyBindingFn={this.keyBindingFn}
        />
      </div>
    </div>
  }
}
