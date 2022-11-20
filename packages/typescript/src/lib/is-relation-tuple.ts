import { RelationTuple } from './relation-tuple'
import { RelationTupleWithReplacements } from './with-replacements/relation-tuple-with-replacements'

export function isRelationTuple(x: RelationTuple | RelationTupleWithReplacements<never>): x is RelationTuple {
	return typeof x.namespace === 'string'
}
