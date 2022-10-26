import { parseRelationTuple, RelationTuple, RelationTupleSyntaxError } from './relation-tuple-parser'

describe('parseRelationTuple tests', () => {
	it('parses simple RelationTuple with subject', () => {
		const result = parseRelationTuple('object#relation@subject')
		expect(result.unwrapOrThrow()).toEqual({
			object: 'object',
			relation: 'relation',
			subjectOrSet: 'subject',
		} as RelationTuple)
	})

	it('parses simple RelationTuple with subjectSet', () => {
		const result = parseRelationTuple('object#relation@subjectObject#subjectRelation')
		expect(result.unwrapOrThrow()).toEqual({
			object: 'object',
			relation: 'relation',
			subjectOrSet: {
				object: 'subjectObject',
				relation: 'subjectRelation',
			},
		} as RelationTuple)
	})

	it.each([
		['asdfhg'],
		['object#relation'],
		['object@subject'],
		['object#relation@subject@sdf'],
		['object#relation@subjectObject#relation@sdf'],
	])('returns error for invalid strings (%s)', (str) => {
		const result = parseRelationTuple(str)

		if (result.hasValue()) {
			console.log(`Result has value: `, result.value)
		}

		expect(result.unwrapErrorOrThrow()).toBeInstanceOf(RelationTupleSyntaxError)
	})
})
