import { defekt, error, Result, value } from 'defekt'
import { RelationTuple, SubjectSet } from './relation-tuple'
import { ModifyTypeOfProperty } from '@nidomiro/ts-type-utils'

export class RelationTupleSyntaxError extends defekt({ code: 'RelationTupleSyntaxError' }) {}

const forbiddenValueCharacters = [':', '#', '@', '(', ')']

type PartialRelationTuple = ModifyTypeOfProperty<
	Partial<RelationTuple>,
	{
		subjectIdOrSet?: Partial<RelationTuple['subjectIdOrSet']>
	}
>

type PartialRelationTupleWithSubjectSet = ModifyTypeOfProperty<
	Partial<RelationTuple>,
	{
		subjectIdOrSet: Partial<SubjectSet>
	}
>

type ParseContext = {
	relationTuple: PartialRelationTuple
	wholeInput: string
}

type ParserState = {
	nextChar: (c: string, currentPosition: number) => Result<ParserState, RelationTupleSyntaxError>
	finish: () => Result<RelationTuple, RelationTupleSyntaxError>
}

abstract class ParseStateCommon implements ParserState {
	private acc = ''

	constructor(protected readonly context: ParseContext) {}

	get accValue(): string {
		return this.acc
	}

	addCharAndReturnThis(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (forbiddenValueCharacters.includes(c)) {
			return error(new RelationTupleSyntaxError(`Unexpected char '${c}' at position ${currentPosition}`))
		}
		this.acc += c

		return value(this as ParserState)
	}

	abstract nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError>

	finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		return error(new RelationTupleSyntaxError('Expected string to continue'))
	}
}

class ParseStateNamespace extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (c === ':') {
			this.context.relationTuple.namespace = this.accValue
			return value(new ParseStateObject(this.context) as ParserState)
		}

		return this.addCharAndReturnThis(c, currentPosition)
	}
}

class ParseStateObject extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '#') {
			this.context.relationTuple.object = this.accValue
			return value(new ParseStateRelation(this.context) as ParserState)
		}
		return this.addCharAndReturnThis(c, currentPosition)
	}
}

class ParseStateRelation extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '@') {
			this.context.relationTuple.relation = this.accValue
			return value(new ParseStateSubjectIdOrSubjectSetNamespace(this.context) as ParserState)
		}

		return this.addCharAndReturnThis(c, currentPosition)
	}
}

class ParseStateSubjectIdOrSubjectSetNamespace extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (c === ':') {
			this.context.relationTuple.subjectIdOrSet = { namespace: this.accValue }
			return value(new ParseStateSubjectSetObject(this.context) as ParserState)
		} else if (
			(this.accValue.length === 0 && c === '(') ||
			(currentPosition === this.context.wholeInput.length - 1 && c === ')')
		) {
			return value(this as ParserState)
		}
		return this.addCharAndReturnThis(c, currentPosition)
	}

	override finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		this.context.relationTuple.subjectIdOrSet = this.accValue
		return value(this.context.relationTuple as RelationTuple)
	}
}

class ParseStateSubjectSetObject extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (c === '#') {
			const castRelationTuple = this.context.relationTuple as PartialRelationTupleWithSubjectSet
			castRelationTuple.subjectIdOrSet.object = this.accValue
			return value(new ParseStateSubjectSetRelation(this.context) as ParserState)
		}

		return this.addCharAndReturnThis(c, currentPosition)
	}
}

class ParseStateSubjectSetRelation extends ParseStateCommon {
	override nextChar(c: string, currentPosition: number): Result<ParserState, RelationTupleSyntaxError> {
		if (currentPosition === this.context.wholeInput.length - 1 && c === ')') {
			return value(this as ParserState)
		}
		return this.addCharAndReturnThis(c, currentPosition)
	}

	override finish(): Result<RelationTuple, RelationTupleSyntaxError> {
		const castRelationTuple = this.context.relationTuple as PartialRelationTupleWithSubjectSet
		castRelationTuple.subjectIdOrSet.relation = this.accValue
		return value(this.context.relationTuple as RelationTuple)
	}
}

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
export const parseRelationTuple = (str: string): Result<RelationTuple, RelationTupleSyntaxError> => {
	const trimmedStr = str.trim()

	const context: ParseContext = { relationTuple: {}, wholeInput: trimmedStr }
	let currentState: ParserState = new ParseStateNamespace(context)

	for (let i = 0; i < trimmedStr.length; i++) {
		const c = trimmedStr[i]
		const newState = currentState.nextChar(c, i)
		if (newState.hasError()) {
			return error(newState.error)
		}
		currentState = newState.value
	}

	return currentState.finish()
}
