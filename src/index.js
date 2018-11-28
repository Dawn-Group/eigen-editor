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
  lightTitle
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
      res: []
    }
    this.onChange = (editorState) => {
      this.setState({ editorState }, () => {
        this.props.onChange(convertToRaw(editorState.getCurrentContent()), editorState)
      })
      if (this.props.autocomplete) {
        window.requestAnimationFrame(() => {
          this.onAutocompleteChange(this.getTypeaheadState());
        })
      }
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
  }


  //////////


  renderAutoComplete() {
    if (this.state.autocompleteState === null) {
      return null
    } else {
      return <Mentions
        {...this.state.autocompleteState}
        textFor={this.state.textFor}
        onenter={this.state.onenter}
        getTheRes={this.getTheRes}
        getTheText={this.props.getTheText}
        fomate={this.props.fomate}
      />
    }
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

    // Remove text that appears after the cursor..
    text = text.substring(0, range.startOffset);
    this.setState({
      textFor: text
    })
    // ..and before the typeahead token.
    let index = -1
    if (text && [text.length - 1] && /\.|\。|\？|\?|\!|\！/g.test(text[text.length - 1])) {
      index = text.length - 1
    }
    if (index === -1) {
      return null;
    }

    text = text.substring(index);

    return {
      text,
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

  onUpArrow = (e) => {
    if (this.state.autocompleteState) {
      let typeaheadState = this.getTypeaheadState(false);
      e.preventDefault();

      typeaheadState.selectedIndex += -1;
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
      this.typeaheadState = typeaheadState;
      this.setState({
        autocompleteState: this.typeaheadState,
      })
    }
  }

  handleReturn = (e) => {
    if (this.state.autocompleteState) {
      if (this.props.autocomplete) {
        e.preventDefault();
        let newstate = getSelect(this.state.editorState, this.state.res[this.state.autocompleteState.selectedIndex])
        this.onChange(newstate)
        this.setState({
          autocompleteState: null,
          onenter: null
        })
        return 'handled'
      }
    } else {
      return 'not-handled'
    }
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
    const { content } = this.props;
    content && this.onChange(EditorState.createWithContent(convertFromRaw(content), decorator))
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
          customStyleMap={features['customStyleMap']}
          editorState={this.state.editorState}
          blockRendererFn={this.blockRenderer}
          blockStyleFn={blockStyleFn}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          ref={(element) => { this.editor = element }}
          readOnly={this.state.liveTeXEdits.count()}
          placeholder='从这里开始写正文'
          onUpArrow={this.onUpArrow}
          onDownArrow={this.onDownArrow}
          handleReturn={this.handleReturn}
        />
      </div>
    </div>
  }
}
