import {
    AtomicBlockUtils,
    EditorState,
    Modifier,
    Entity,
    SelectionState,
    RichUtils,
    convertToRaw
} from 'draft-js'
import darftConst from '@const'
import customStyleMap from '@renders/styles'
import { setBlockData, getAllBlocks, getSelectionEntity } from 'draftjs-utils'
import { message } from 'antd'


// undo
export function undo(editorState) {
    let newstate = EditorState.undo(editorState)
    return newstate
}

// redo
export function redo(editorState) {
    let newstate = EditorState.redo(editorState)
    return newstate
}

export function getUndoStatus(editorState) {
    return editorState.getUndoStack().size
}

export function getRedoStatus(editorState) {
    return editorState.getRedoStack().size
}

// common inlinestyle
export function commonInlineStyle(editorState, inlinestyle) {
    return RichUtils.toggleInlineStyle(
        editorState,
        inlinestyle
    )
}

// common blockstyle
export function commonBlockStyle(editorState, blockType) {
    return RichUtils.toggleBlockType(
        editorState,
        blockType
    )
}

// close the features
export function closeInlineFeatures(closeable) {
    let openFeature = []
    openFeature = darftConst.inlineStyles.filter(item => {
        return closeable.indexOf(item) == -1
    })
    return openFeature
}

export function closeBlockFeatures(closeable) {
    let openFeature = []
    openFeature = darftConst.blockStyles.filter(item => {
        return closeable.indexOf(item) == -1
    })
    return openFeature
}

// fontSize Modify
export function fontSizeModify(editorState, fontSize) {
    return applyInlineStyle(editorState, 'FONTSIZE-' + fontSize, darftConst.fontSizes.map(item => 'FONTSIZE-' + item))
}

// color Modify
export function colorModify(editorState, color) {
    return applyInlineStyle(editorState, 'COLOR-' + color.replace('#', ''), darftConst.colors.map(item => 'COLOR-' + item.replace('#', '').toUpperCase()))
}

// backgroundColor Modify
export function backgroundColorModify(editorState, color) {
    return applyInlineStyle(editorState, 'BGCOLOR-' + color.replace('#', ''), darftConst.colors.map(item => 'BGCOLOR-' + item.replace('#', '').toUpperCase()))
}

// FontFamily Modify
export function fontFamiliesModify(editorState, fontFamily) {
    return applyInlineStyle(editorState, 'FONTFAMILY-' + fontFamily, darftConst.fontFamilies.map(item => 'FONTFAMILY-' + item.name.toUpperCase()))
}

export function letterSpacesModify(editorState, space) {
    return applyInlineStyle(editorState, 'LETTERSPACE-' + space, darftConst.LetterSpaces.map(item => 'LETTERSPACE-' + item.toUpperCase()))
}

export function lineHeightsModify(editorState, space) {
    return applyInlineStyle(editorState, 'LINEHEIGHT-' + space, darftConst.LineHeights.map(item => 'LINEHEIGHT-' + item.toUpperCase()))
}

export function leftRightMarginModify(editorState, space) {
    return applyInlineStyle(editorState, 'LEFTRIGHTMARGIN-' + space, darftConst.LeftRightMargins.map(item => 'LEFTRIGHTMARGIN-' + item.toUpperCase()))
}

export function topMarginModify(editorState, space) {
    return applyInlineStyle(editorState, 'TOPMARGIN-' + space, darftConst.LeftRightMargins.map(item => 'TOPMARGIN-' + item.toUpperCase()))
}

export function bottomMarginModify(editorState, space) {
    return applyInlineStyle(editorState, 'BOTTOMMARGIN-' + space, darftConst.LeftRightMargins.map(item => 'BOTTOMMARGIN-' + item.toUpperCase()))
}

export function firstIntent(editorState, indent) {
    const currentInlineStyle = editorState.getCurrentInlineStyle()
    if (!currentInlineStyle.has('TEXTINDENT-2EM')) {
        return applyInlineStyle(editorState, 'TEXTINDENT-' + indent, darftConst.textIndent.map(item => 'TEXTINDENT-' + item.toUpperCase()))
    } else {
        return closeIntent(editorState, 'TEXTINDENT-2EM')
    }
}

function closeIntent(editorState, item) {
    let contentState = editorState.getCurrentContent()
    let selectionState = editorState.getSelection()
    let newContentState = Modifier.removeInlineStyle(contentState, selectionState, item)
    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style')
    return newEditorState
}

// clear style not working !!!!!! do not user it use the removeAllStyles function to remove the style
export function clearStyle(editorState) {
    return RichUtils.toggleBlockType(editorState, 'unstyled')
}

export function applyInlineStyle(editorState, style, stylesToBeRemoved) {
    let selectionState = editorState.getSelection()

    let contentState = editorState.getCurrentContent()
    if (selectionState.isCollapsed()) {
        return editorState
    }

    style = style.toUpperCase()
    stylesToBeRemoved = stylesToBeRemoved.filter(item => item !== style)
    const currentInlineStyle = editorState.getCurrentInlineStyle()

    // make sure there is only one color, one family style, on fontsize
    const newContentState = stylesToBeRemoved.length ? stylesToBeRemoved.reduce((contentState, item) => {
        return Modifier.removeInlineStyle(contentState, selectionState, item)
    }, contentState) : contentState

    const newEditorState = stylesToBeRemoved.length ? EditorState.push(editorState, newContentState, 'change-inline-style') : editorState
    return RichUtils.toggleInlineStyle(newEditorState, style)
}

// remove All style
export function removeAllStyles(editorState) {
    let selectionState = editorState.getSelection()
    let contentState = editorState.getCurrentContent()
    if (selectionState.isCollapsed()) {
        return editorState
    }
    let styles = darftConst.fontSizes.map(item => 'FONTSIZE-' + item)
        .concat(darftConst.colors.map(item => 'COLOR-' + item.replace('#', '').toUpperCase()))
        .concat(darftConst.colors.map(item => 'BGCOLOR-' + item.replace('#', '').toUpperCase()))
        .concat(darftConst.fontFamilies.map(item => 'FONTFAMILY-' + item.name.toUpperCase()))
        .concat(darftConst.inlineStyles)

    const newContentState = styles.reduce((contentState, item) => {
        return Modifier.removeInlineStyle(contentState, selectionState, item)
    }, contentState)

    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style')
    return newEditorState
}

// style check
export function inlineStyleCheck(editorState) {
    return editorState.getCurrentInlineStyle()
}

// block style check
export function blockStyleCheck(editorState) {
    return editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()
}

export function addTheLinkOnText(editorState, href) {
    let contentState = editorState.getCurrentContent()
    const newContentState = contentState.createEntity('LINK', 'MUTABLE', { url: href, target: '_blank' })
    let entityKey = newContentState.getLastCreatedEntityKey()
    let newstate = RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
    )
    return newstate
}

export function removeTheLink(editorState) {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
        return RichUtils.toggleLink(editorState, selection, null)
    }else{
        return editorState
    }
}

// set Align
export function setTextAlign(editorState, align = 'left') {
    return toggleSelectionAlignment(editorState, align)
}

function toggleSelectionAlignment(editorState, alignment) {
    return setSelectionBlockData(editorState, {
        textAlign: getSelectionBlockData(editorState, 'textAlign') !== alignment ? alignment : undefined
    })
}

function setSelectionBlockData(editorState, blockData) {
    return setBlockData(editorState, blockData)
}

function getSelectionBlock(editorState) {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    return contentState.getBlockForKey(selectionState.getAnchorKey())
}

function getSelectionBlockData(editorState, name) {
    const blockData = getSelectionBlock(editorState).getData()
    return name ? blockData.get(name) : blockData
}

// insert the block such as image video audio
export function insertBlock(editorState, param) {
    let contentState = editorState.getCurrentContent()
    let contentStateWithEntity = contentState.createEntity(
        param.type,
        'IMMUTABLE',
        param.obj
    )
    if (!getSelectionEntity(editorState)) {
        let entityKey = contentStateWithEntity.getLastCreatedEntityKey()

        let newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        )
        let newstate = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
        )
        return newstate
    } else {
        message.warning('请不要在有sku，图的地方，插入sku或者图片')
        return editorState
    }
}

// insert text emoji
export function insertText(editorState, string) {
    if (editorState.getSelection().isCollapsed() && !getSelectionEntity(editorState)) {
        let content = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), string)
        const newstate = EditorState.push(editorState, content, 'insert-fragment')
        return newstate
    } else {
        message.warning('请不要在有sku，图的地方，插入文字')
        return editorState
    }
}


<<<<<<< HEAD
// light title
export function lightTitle(editorState) {
    let state = commonInlineStyle(editorState, 'BOLD')
    let newstate = setTextAlign(state,'center')
    return newstate
}

=======
>>>>>>> add the remove link


// create inline css like { color: #23411 }, { backgroundcolor: #23324 }
export function customSiteMap() {
    return customStyleMap
}


export function wechatFeatures() {
    let features = []
    return features = [
        'RLINK',
        'BOLD',
        'ITALIC',
        'UNDERLINE',
        'UNDO',
        'REDO',
        'FONTSIZEMODIFY',
        'BLOCKQUOTE',
        'SPLITLINE',
        'CLEARALLSTYLES',
        'ADDLINK',
        'ADDEMOJI',
        'COLORSMOdDIFY',
        'BACKGROUNDCOLORMODIFY',
        'FIRSTINTENT',
        'ALIGNCENTER',
        'ALIGNLEFT',
        'ALIGNRIGHT',
        'ALIGNJUSTIFY',
        'ADDIMG',
        'ADDSKU',
        'LINEHEIGHT',
        'LETTERWIDTH',
        'TOPMARGIN',
        'LEFTRIGHTMARGIN',
        'BOTTOMMARGIN'
    ]
}

export function alibabaFeatures() {
    return [
        'BOLD',
        'ITALIC',
        'UNDERLINE',
        'UNDO',
        'REDO',
        'ADDLINK',
        'ADDIMG',
        'ADDSKU',
        'ALIGNCENTER',
        'ALIGNLEFT',
        'ALIGNRIGHT',
        'ALIGNJUSTIFY'
    ]
}

export function touTiaoFeatures() {
    return [
        'BOLD',
        'SPLITLINE',
        'CLEARALLSTYLES',
        'BLOCKQUOTE',
        'UNDO',
        'REDO',
        'ADDLINK',
        'ADDIMG',
        'ADDSKU',
        'ALIGNCENTER',
        'ALIGNLEFT',
        'ALIGNRIGHT',
        'ALIGNJUSTIFY'
    ]
}

export function defaultstyle() {
    let save_state = {
        blocks: [
            {
                key: 'd2fa8',
                text: '「小标题」',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [
                    {
                        offset: 0,
                        length: 5,
                        style: 'BOLD'
                    }
                ],
                entityRanges: [],
                data: {
                    textAlign: 'center'
                }
            }
        ],
        entityMap: {}
    }
    return save_state
}