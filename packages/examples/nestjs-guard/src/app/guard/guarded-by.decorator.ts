import {
    parseRelationTupleWithReplacements,
    RelationTupleStringGenerator,
    RelationTupleWithReplacements,
} from '@nidomiro/relation-tuple-parser'
import { SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PossibleReplacements } from './possible-replacements'

type GuardedByMetadataType = RelationTupleWithReplacements<PossibleReplacements>

const GUARDED_BY_METADATA_KEY = Symbol('GuardedByKey')

export const GuardedBy = (relationTuple: string | RelationTupleStringGenerator<PossibleReplacements>) => {
    let valueToSet: GuardedByMetadataType
    if (typeof relationTuple === 'string') {
        valueToSet = parseRelationTupleWithReplacements(() => relationTuple).unwrapOrThrow()
    } else {
        valueToSet = parseRelationTupleWithReplacements(relationTuple).unwrapOrThrow()
    }

    return SetMetadata(GUARDED_BY_METADATA_KEY, valueToSet)
}

export const getGuardingRelationTuple = (
    reflector: Reflector,
    handler: Parameters<Reflector['get']>[1],
): RelationTupleWithReplacements<PossibleReplacements> | null => {
    return (
        reflector.get<GuardedByMetadataType, typeof GUARDED_BY_METADATA_KEY>(GUARDED_BY_METADATA_KEY, handler) ?? null
    )
}
