export default function(props){
  const colorStyles = {}
  const bgColorStyles = {}
  const fontSizeStyles = {}
  const fontFamilyStyles = {}
  const indentStyles = {}
  const letterSpaceStyles = {}
  const leftRightMarginStyles = {}
  const topMarginStyles = {}
  const bottomMarginStyles = {}
  const lineHeightStyles = {}

  props.colors.forEach((color) => {
    let color_id = color.replace('#', '').toUpperCase()
    colorStyles['COLOR-' + color_id] = { color }
    bgColorStyles['BGCOLOR-' + color_id] = { backgroundColor: color }
  })

  props.fontSizes.forEach((fontSize) => {
    fontSizeStyles['FONTSIZE-' + fontSize] = { fontSize: fontSize }
  })

  props.fontFamilies.forEach((fontFamily) => {
    fontFamilyStyles['FONTFAMILY-' + fontFamily.name.toUpperCase()] = {
      fontFamily: fontFamily.family
    }
  })

  props.indentStyles.forEach((indent) => {
    indentStyles['TEXTINDENT-' + indent.toUpperCase()] = {
      display: 'inline-block',
      textIndent: indent
    }
  })

  props.LetterSpaces.forEach((letterspace) => {
    letterSpaceStyles['LETTERSPACE-' + letterspace.toUpperCase()] = {
      letterSpacing: letterspace
    }
  })

  props.LineHeights.forEach((lineheight) => {
    lineHeightStyles['LINEHEIGHT-' + lineheight.toUpperCase()] = {
      lineHeight: lineheight
    }
  })

  props.LeftRightMargins.forEach((leftrightmargin) => {
    leftRightMarginStyles['LEFTRIGHTMARGIN-' + leftrightmargin.toUpperCase()] = {
      marginLeft: leftrightmargin,
      marginRight: leftrightmargin
    }
  })

  props.TopMargins.forEach((topmargin) => {
    topMarginStyles['TOPMARGIN-' + topmargin.toUpperCase()] = {
      display: 'inline-block',
      marginTop: topmargin
    }
  })

  props.BottomMargins.forEach((bottommargin) => {
    bottomMarginStyles['BOTTOMMARGIN-' + bottommargin.toUpperCase()] = {
      display: 'inline-block',
      marginBottom: bottommargin
    }
  })

  return {
    ...colorStyles,
    ...bgColorStyles,
    ...fontSizeStyles,
    ...fontFamilyStyles,
    ...indentStyles,
    ...letterSpaceStyles,
    ...leftRightMarginStyles,
    ...topMarginStyles,
    ...bottomMarginStyles,
    ...lineHeightStyles
  }
}
