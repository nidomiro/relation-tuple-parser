import { AbstractParseTreeVisitor } from 'antlr4ts/tree'
import { RelationTupleVisitor } from './generated/antlr/RelationTupleVisitor'
import {
    NamespacedObjectContext,
    RelationTupleContext,
    SubjectIdContext,
    SubjectSetContext,
} from './generated/antlr/RelationTupleParser'
import { ANTLRErrorListener, Recognizer, Token } from 'antlr4ts'
import { RelationTuple } from './relation-tuple'
import { RelationTupleSyntaxError, RelationTupleSyntaxErrorDetail } from './errors/relation-tuple-syntax.error'

export class MyRelationTupleVisitor
    extends AbstractParseTreeVisitor<RelationTuple>
    implements RelationTupleVisitor<RelationTuple>
{
    protected defaultResult(): RelationTuple {
        return {
            namespace: '',
            object: '',
            relation: '',
        } as RelationTuple
    }

    override aggregateResult(aggregate: RelationTuple, nextResult: RelationTuple) {
        Object.assign(aggregate, nextResult)
        return aggregate
    }

    visitRelationTuple(ctx: RelationTupleContext): RelationTuple {
        const aggregate = this.visitChildren(ctx)
        const namespacedObjectContext = ctx.namespacedObject()

        aggregate.relation = ctx._relation?.text ?? ''
        aggregate.namespace = namespacedObjectContext._namespace?.text ?? ''
        aggregate.object = namespacedObjectContext._object?.text ?? ''

        return aggregate
    }

    visitSubjectId(ctx: SubjectIdContext): RelationTuple {
        const aggregate = this.visitChildren(ctx)
        aggregate.subjectIdOrSet = ctx.text

        return aggregate
    }

    visitSubjectSet(ctx: SubjectSetContext): RelationTuple {
        const aggregate = this.visitChildren(ctx)

        let namespacedObjectContext: NamespacedObjectContext
        try {
            namespacedObjectContext = ctx.namespacedObject()
        } catch (e) {
            throw new RelationTupleSyntaxError(`Expected SubjectSet to contain an namespaced object`)
        }

        const subjectIdOrSet: RelationTuple['subjectIdOrSet'] = {
            namespace: namespacedObjectContext._namespace?.text ?? '',
            object: namespacedObjectContext._object?.text ?? '',
        }
        if (ctx._subjectRelation?.text != null) {
            subjectIdOrSet.relation = ctx._subjectRelation.text
        }

        aggregate.subjectIdOrSet = subjectIdOrSet

        return aggregate
    }
}

export class MyParserErrorListener implements ANTLRErrorListener<Token> {
    private _errors: Array<RelationTupleSyntaxErrorDetail> = []
    public get errors(): Array<RelationTupleSyntaxErrorDetail> {
        return this._errors
    }

    constructor(private readonly wholeInput: string) {}

    syntaxError(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognizer: Recognizer<Token, any>,
        offendingSymbol: Token | undefined,
        line: number,
        charPositionInLine: number,
    ) {
        const errorDetail = {
            wholeInput: this.wholeInput,
            line,
            charPositionInLine,
            offendingSymbol: offendingSymbol?.text,
        }

        this._errors.push(errorDetail)
    }
}
