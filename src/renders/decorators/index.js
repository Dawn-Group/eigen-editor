import { CompositeDecorator, Entity } from 'draft-js'
import React from 'react'

function findLinkEntities (contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData()
  return (
    <a
      href={url}
      style={{
        color: '#3b5998',
        textDecoration: 'underline'
      }}>
      {props.children}
    </a>
  )
}

export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
])
