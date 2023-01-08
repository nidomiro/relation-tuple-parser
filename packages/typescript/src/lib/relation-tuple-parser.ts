import { error, Result, value } from 'defekt'
import { RelationTuple } from './relation-tuple'
import { RelationTupleSyntaxError } from './errors/relation-tuple-syntax.error'
import { UnknownError } from './errors/unknown.error'

export const parseRelationTuple = (
  str: string,
): Result<RelationTuple, RelationTupleSyntaxError | UnknownError> => {
  const trimmedStr = str.trim()

  const relationTuple: Partial<RelationTuple> = {}

  const rootParts = trimmedStr.split('@')

  if (rootParts.length != 2) {
    return error(new RelationTupleSyntaxError())
  }

  {
    const parts = rootParts.shift()?.split(/[:#]/) ?? []

    const namespace = parts.shift()
    const object = parts.shift()
    const relation = parts.shift()
    if (
      namespace == null ||
      namespace.length === 0 ||
      object == null ||
      object.length === 0 ||
      relation == null ||
      relation.length === 0 ||
      parts.shift() != null
    ) {
      return error(new RelationTupleSyntaxError())
    }
    relationTuple.namespace = namespace
    relationTuple.object = object
    relationTuple.relation = relation
  }

  {
    let subjectPart = rootParts.shift() ?? ''
    if (subjectPart.startsWith('(') && subjectPart.endsWith(')')) {
      subjectPart = subjectPart.substring(1, subjectPart.length - 1)
    }
    const parts = subjectPart.split(/[:#]/)
    const namespace = parts.shift()
    const object = parts.shift()
    let relation = parts.shift()

    if (relation?.length === 0) {
      relation = undefined
    }

    if (namespace == null || namespace.length === 0) {
      return error(new RelationTupleSyntaxError())
    }

    if (object == null) {
      relationTuple.subjectIdOrSet = namespace
    } else {
      if (
        namespace == null ||
        namespace.length === 0 ||
        object == null ||
        object.length === 0 ||
        parts.shift() != null ||
        !subjectPart.includes(':')
      ) {
        return error(new RelationTupleSyntaxError())
      }

      const subjectSet = {
        namespace,
        object,
        relation,
      }

      relationTuple.subjectIdOrSet = subjectSet
    }
  }

  return value(relationTuple as RelationTuple)
}
