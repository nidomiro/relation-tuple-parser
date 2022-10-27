import { defekt, error, Result, value } from 'defekt'
import { assertNever } from 'assert-never'
import { RelationTuple, SubjectSet } from './relation-tuple'

export class RelationTupleSyntaxError extends defekt({ code: 'RelationTupleSyntaxError' }) {
}

enum ParseState {
	Namespace,
	Object,
	Relation,
	SubjectOrSubjectNamespace,
	SubjectObject,
	SubjectRelation,
}

const forbiddenValueCharacters = [':', '#', '@']

type PartialRelationTuple = Omit<Partial<RelationTuple>, 'subjectOrSet'> & {
	subjectOrSet?: Partial<RelationTuple['subjectOrSet']>
}

/**
 * str syntax:
 * ```
 * ⟨tuple⟩ ::= ⟨object⟩‘#’⟨relation⟩‘@’⟨subject⟩
 * ⟨object⟩ ::= ⟨namespace⟩‘:’⟨object id⟩
 * ⟨subject⟩ ::= ⟨subject id⟩ | ⟨subjectSet⟩
 * ⟨subjectSet⟩ ::= ⟨object⟩‘#’⟨relation⟩
 * ```
 * example: `object#relation@subject`
 *
 *
 * @param str
 */
export const parseRelationTuple = (str: string): Result<RelationTuple, RelationTupleSyntaxError> => {
	let tmp = ''
	let tmpIncludesForbiddenChar = false

	let state: ParseState = ParseState.Namespace

	const result: PartialRelationTuple = {}

	for (const c of str) {
		switch (state) {
			case ParseState.Namespace: {
				if (c === ':') {
					result.namespace = tmp
					tmp = ''
					state = ParseState.Object
				} else {
					tmp += c
				}
				break
			}
			case ParseState.Object: {
				if (c === '#') {
					result.object = tmp
					tmp = ''
					state = ParseState.Relation
				} else {
					tmp += c
				}
				break
			}
			case ParseState.Relation: {
				if (c === '@') {
					result.relation = tmp
					tmp = ''
					state = ParseState.SubjectOrSubjectNamespace
				} else {
					tmp += c
				}
				break
			}
			case ParseState.SubjectOrSubjectNamespace: {
				if (c === ':') {
					result.subjectOrSet = {
						namespace: tmp,
					}
					tmp = ''
					state = ParseState.SubjectObject
				} else {
					if (forbiddenValueCharacters.includes(c)) return error(new RelationTupleSyntaxError())
					tmp += c
				}
				break
			}
			case ParseState.SubjectObject: {
				if (c === '#') {
					(result.subjectOrSet as Partial<SubjectSet>).object = tmp
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
		case ParseState.SubjectOrSubjectNamespace:
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
