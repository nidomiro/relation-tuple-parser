import { defekt, Result, error, value } from 'defekt'
import { assertNever } from 'assert-never'

export interface SubjectSet {
	object: string
	relation: string
}

export interface RelationTuple {
	object: string
	relation: string
	subjectOrSet: string | SubjectSet
}

export class RelationTupleSyntaxError extends defekt({ code: 'SyntaxError' }) {}

enum ParseState {
	RelationTupleObject,
	RelationTupleRelation,
	SubjectOrSubjectObject,
	SubjectRelation,
}

const forbiddenValueCharacters = [':', '#', '@']

/**
 * str syntax:
 * ```
 * <relation-tuple> ::= <object>'#'relation'@'<subject>
 * <object> ::= namespace':'object_id
 * <subject> ::= subject_id | <subject_set>
 * <subject_set> ::= <object>'#'relation
 * ```
 * example: `object#relation@subject`
 *
 *
 * @param str
 */
export const parseRelationTuple = (str: string): Result<RelationTuple, RelationTupleSyntaxError> => {
	let tmp = ''
	let tmpIncludesForbiddenChar = false

	let state: ParseState = ParseState.RelationTupleObject

	const result: Omit<Partial<RelationTuple>, 'subjectOrSet'> & {
		subjectOrSet?: Partial<RelationTuple['subjectOrSet']>
	} = {}

	for (const c of str) {
		switch (state) {
			case ParseState.RelationTupleObject: {
				if (c !== '#') {
					tmp += c
				} else {
					result.object = tmp
					tmp = ''
					state = ParseState.RelationTupleRelation
				}
				break
			}
			case ParseState.RelationTupleRelation: {
				if (c !== '@') {
					tmp += c
				} else {
					result.relation = tmp
					tmp = ''
					state = ParseState.SubjectOrSubjectObject
				}
				break
			}
			case ParseState.SubjectOrSubjectObject: {
				if (c !== '#') {
					if (forbiddenValueCharacters.includes(c)) {
						tmpIncludesForbiddenChar = true
					}
					tmp += c
				} else {
					result.subjectOrSet = {
						object: tmp,
					}
					tmp = ''
					state = ParseState.SubjectRelation
				}
				break
			}
			case ParseState.SubjectRelation: {
				if (forbiddenValueCharacters.includes(c)) return error(new RelationTupleSyntaxError())
				tmp += c
				break
			}
			default:
				assertNever(state)
		}
	}

	switch (state) {
		case ParseState.SubjectOrSubjectObject:
			if (tmpIncludesForbiddenChar) return error(new RelationTupleSyntaxError())
			result.subjectOrSet = tmp
			break
		case ParseState.SubjectRelation:
			;(result.subjectOrSet as Partial<SubjectSet>).relation = tmp
			break

		default:
			return error(new RelationTupleSyntaxError())
	}

	return value(result as RelationTuple)
}
