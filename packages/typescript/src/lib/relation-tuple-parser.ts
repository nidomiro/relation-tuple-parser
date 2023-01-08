import { error, Result, value } from 'defekt'
import { RelationTuple } from './relation-tuple'
import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { RelationTupleLexer } from './generated/antlr/RelationTupleLexer'
import { RelationTupleParser } from './generated/antlr/RelationTupleParser'
import { MyParserErrorListener, MyRelationTupleVisitor } from './relation-tuple-antlr'
import { RelationTupleSyntaxError } from './errors/relation-tuple-syntax.error'
import { UnknownError } from './errors/unknown.error'

/**
 * Parses the given string to a {@link RelationTuple}.
 * str syntax:
 * ```
 * <relation-tuple> ::= <object>'#'relation'@'<subject> | <object>'#'relation'@('<subject>')'
 * <object> ::= namespace':'object_id
 * <subject> ::= subject_id | <subject_set>
 * <subject_set> ::= <object>'#'relation
 * ```
 * example: `object#relation@subject`
 * The characters `:@#()` are reserved for syntax use only (=> forbidden in values)
 *
 * @param str
 * @return The parsed {@link RelationTuple} or {@link RelationTupleSyntaxError} in case of an invalid string.
 */
export const parseRelationTuple = (str: string): Result<RelationTuple, RelationTupleSyntaxError | UnknownError> => {
  const trimmedStr = str.trim()

  const inputStream = CharStreams.fromString(trimmedStr)
  const lexer = new RelationTupleLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new RelationTupleParser(tokenStream)

  const parserErrorListener = new MyParserErrorListener(trimmedStr)

  parser.removeErrorListeners()
  parser.addErrorListener(parserErrorListener)
  const visitor = new MyRelationTupleVisitor()
  try {
    const parsedRelationTuple = visitor.visit(parser.relationTuple())

    if (parserErrorListener.errors.length > 0) {
      return error(new RelationTupleSyntaxError({ data: { errors: parserErrorListener.errors } }))
    }

    return value(parsedRelationTuple)
  } catch (e) {
    if (e instanceof RelationTupleSyntaxError) {
      return error(e)
    }
    return error(new UnknownError({ data: e }))
  }
}

export const parseRelationTupleSplit = (
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
