

export interface RelationTupleParserConfig {
	allowEmptyRelationInSubjectSet: boolean
}

export type RelationTupleParserConfigOverride = Partial<RelationTupleParserConfig>

export const DefaultRelationTupleParserConfig: RelationTupleParserConfig = {
	allowEmptyRelationInSubjectSet: true
}
