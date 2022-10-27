import { defekt, error, Result, value } from 'defekt'
import { RelationTuple, SubjectSet } from './relation-tuple'
import { type ModifyTypeOfAttribute } from './util'

export class RelationTupleSyntaxError extends defekt({ code: 'RelationTupleSyntaxError' }) {
}

const forbiddenValueCharacters = [':', '#', '@']

type PartialRelationTuple = ModifyTypeOfAttribute<Partial<RelationTuple>, {
	subjectIdOrSet?: Partial<RelationTuple['subjectIdOrSet']>
}>

type ParseContext = {
	relationTuple: PartialRelationTuple
}

type ParserState = {
	nextChar: (c: string) => Result<ParserState, RelationTupleSyntaxError>
	finish: () => Result<RelationTuple, RelationTupleSyntaxError>
}

abstract class ParseStateCommon implements ParserState {
	protected acc = ''

	constructor(protected readonly context: ParseContext) {
	}

	abstract nextChar(c: string): Result<ParserState, RelationTupleSyntaxError>

	finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		return error(new RelationTupleSyntaxError('Expected string to continue'))
	}

}

class ParseStateNamespace extends ParseStateCommon {

	nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (c === ':') {
			this.context.relationTuple.namespace = this.acc
			return value(new ParseStateObject(this.context) as ParserState)
		} else if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}
}

class ParseStateObject extends ParseStateCommon {

	override nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '#') {
			this.context.relationTuple.object = this.acc
			return value(new ParseStateRelation(this.context) as ParserState)
		} else if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}
}

class ParseStateRelation extends ParseStateCommon {

	override nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '@') {
			this.context.relationTuple.relation = this.acc
			return value(new ParseStateSubjectIdOrSubjectSetNamespace(this.context) as ParserState)
		} else if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}
}

class ParseStateSubjectIdOrSubjectSetNamespace extends ParseStateCommon {

	override nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (c === ':') {
			this.context.relationTuple.subjectIdOrSet = { namespace: this.acc }
			return value(new ParseStateSubjectSetObject(this.context) as ParserState)
		} else if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}

	override finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		this.context.relationTuple.subjectIdOrSet = this.acc
		return value(this.context.relationTuple as RelationTuple)
	}
}

class ParseStateSubjectSetObject extends ParseStateCommon {

	override nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '#') {
			(this.context.relationTuple.subjectIdOrSet as Partial<SubjectSet>).object = this.acc
			return value(new ParseStateSubjectSetRelation(this.context) as ParserState)
		} else if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}
}

class ParseStateSubjectSetRelation extends ParseStateCommon {
	override nextChar(c: string): Result<ParserState, RelationTupleSyntaxError> {
		if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError())
		}
		this.acc += c
		return value(this as ParserState)
	}

	override finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		(this.context.relationTuple.subjectIdOrSet as Partial<SubjectSet>).relation = this.acc
		return value(this.context.relationTuple as RelationTuple)
	}
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
	const context: ParseContext = { relationTuple: {} }
	let currentState: ParserState = new ParseStateNamespace(context)

	for (const c of str) {
		const newState = currentState.nextChar(c)
		if (newState.hasError()) {
			return error(newState.error)
		}
		currentState = newState.value
	}

	return currentState.finish()
}
