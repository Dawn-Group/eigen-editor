/*
 * @Author: kaijun.he
 * @Date: 2017-11-20 09:36:10
 * @Last Modified by: linjin
 * @Last Modified time: 2018-10-25 13:19:31
 */
import {
  AtomicBlockUtils,
  EditorState,
  Modifier,
  Entity
} from 'draft-js'

/**
 * draftjs 库相关方法
 */

// 所有的方法遵循一个原则，初始化 Draft 时传入 editorState，然后方法会返回新的 editorState

class Draft {
  constructor (editorState) {
    this.editorState = editorState || EditorState.createEmpty()
  }

  setMedia (type, obj) {
    let contentState = this.editorState.getCurrentContent()
    let contentStateWithEntity = contentState.createEntity(
      type,
      'IMMUTABLE',
      obj
    )

    let entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    let newEditorState = EditorState.set(
      this.editorState,
      { currentContent: contentStateWithEntity }
    )
    let newstate = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    )
    this.editorState = newstate
    return newstate
  }

  insertText (string) {
    let content = Modifier.insertText(this.editorState.getCurrentContent(), this.editorState.getSelection(), string + '\n')
    const newstate = EditorState.push(this.editorState, content, 'insert-fragment')
    this.editorState = newstate
    return newstate
  }
}

export default Draft
