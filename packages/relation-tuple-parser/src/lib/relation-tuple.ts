export interface SubjectSet {
	object: string
	relation: string
}

export interface RelationTuple {
	object: string
	relation: string
	subjectOrSet: string | SubjectSet
}
