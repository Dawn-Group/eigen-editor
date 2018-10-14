
export function blockStyleFn (block) {
  const blockAlignment = block.getData() && block.getData().get('textAlign')
  if (blockAlignment) {
    switch (blockAlignment) {
      case 'left':
        return 'textAlignLeft'
      case 'right':
        return 'textAlignRight'
      case 'center':
        return 'textAlignCenter'
      case 'justify':
        return 'textAlignJustify'
      default:
        return 'textAlignLeft'
    }
  } else {
    switch (block.getType()) {
      case 'blockquote' : return 'blockquoteStyle'
        break
      default:
        return null
    }
  }
}
