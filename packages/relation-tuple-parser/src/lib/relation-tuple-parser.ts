import { defekt, error, Result, value } from 'defekt'
import { assertNever } from 'assert-never'
import { RelationTuple, SubjectSet } from './relation-tuple'

export class RelationTupleSyntaxError extends defekt({ code: 'SyntaxError' }) {}

enum ParseState {
	RelationTupleObject,
	RelationTupleRelation,
	SubjectOrSubjectObject,
	SubjectRelation,
}

const forbiddenValueCharacters = [':', '#', '@']

type PartialRelationTuple = Omit<Partial<RelationTuple>, 'subjectOrSet'> & {
	subjectOrSet?: Partial<RelationTuple['subjectOrSet']>
}

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

	const result: PartialRelationTuple = {}

	for (const c of str) {
		switch (state) {
			case ParseState.RelationTupleObject: {
				if (c === '#') {
					result.object = tmp
					tmp = ''
					state = ParseState.RelationTupleRelation
				} else {
					tmp += c
				}
				break
			}
			case ParseState.RelationTupleRelation: {
				if (c === '@') {
					result.relation = tmp
					tmp = ''
					state = ParseState.SubjectOrSubjectObject
				} else {
					tmp += c
				}
				break
			}
			case ParseState.SubjectOrSubjectObject: {
				if (c === '#') {
					result.subjectOrSet = {
						object: tmp,
					}
					tmp = ''
					state = ParseState.SubjectRelation
				} else {
					if (forbiddenValueCharacters.includes(c)) {
						tmpIncludesForbiddenChar = true
					}
					tmp += c
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
			(result.subjectOrSet as Partial<SubjectSet>).relation = tmp
			break

		default:
			return error(new RelationTupleSyntaxError())
	}

	return value(result as RelationTuple)
}
