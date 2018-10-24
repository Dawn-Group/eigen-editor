import React from 'react'
import { SplitLine, EditorImage, EditorSku, EditorTable } from '../../atomic'
const Block = (props) => {
  let block = null
  if (props.block.getEntityAt(0)) {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0)
    )
    const params = entity.getData()
    let type = entity.getType()
    type = type.toLowerCase()
    switch (type) {
      case 'image':
        block = <EditorImage src={params.src} all={props} />
        break
      case 'sku':
        block = <EditorSku data={params} all={props} />
        break
      case 'splitline':
        block = <SplitLine data={params} />
        break
      case 'table':
        block = <EditorTable data={params.data} {...props} />
      default:
        break
    }
  }
  return block
}

export default Block
