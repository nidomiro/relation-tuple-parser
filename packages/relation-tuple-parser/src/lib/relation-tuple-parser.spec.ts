import { parseRelationTuple, RelationTupleSyntaxError } from './relation-tuple-parser'
import { type RelationTuple } from './relation-tuple'

function nsToMs(ns: bigint): bigint
function nsToMs(ns: number): number
function nsToMs(ns: bigint | number): bigint | number {
	if (typeof ns === 'bigint') {
		return ns / BigInt(1_000_000)
	} else {
		return ns / 1_000_000
	}
}

const generateRelationTuple = (i: number, withSubjectSet: boolean) => {
	const uuidLengthString = String(i).repeat(36)
	const subjectSet = `${uuidLengthString}:${uuidLengthString}#${uuidLengthString}`

	if (withSubjectSet) {
		return `${subjectSet}@${subjectSet}`
	}
	return `${subjectSet}@${uuidLengthString}`
}

describe('parseRelationTuple tests', () => {
	it('parses simple RelationTuple with subject', () => {
		const result = parseRelationTuple('namespace:object#relation@subject')
		expect(result.unwrapOrThrow()).toEqual({
			namespace: 'namespace',
			object: 'object',
			relation: 'relation',
			subjectOrSet: 'subject',
		} as RelationTuple)
	})

	it('parses simple RelationTuple with subjectSet', () => {
		const result = parseRelationTuple('namespace:object#relation@subjectNamespace:subjectObject#subjectRelation')
		expect(result.unwrapOrThrow()).toEqual({
			namespace: 'namespace',
			object: 'object',
			relation: 'relation',
			subjectOrSet: {
				namespace: 'subjectNamespace',
				object: 'subjectObject',
				relation: 'subjectRelation',
			},
		} as RelationTuple)
	})

	it('parses simple RelationTuple with subject and namespace', () => {
		const result = parseRelationTuple('namespace:object#relation@subject')
		expect(result.unwrapOrThrow()).toEqual({
			namespace: 'namespace',
			object: 'object',
			relation: 'relation',
			subjectOrSet: 'subject',
		} as RelationTuple)
	})

	describe('performance tests', () => {
		it('with subject', () => {
			const relationTuples = Array.from({ length: 100 }, (_, i) => generateRelationTuple(i, false))

			const result = relationTuples.map((tuple) => {
				const start = process.hrtime.bigint()
				const result = parseRelationTuple(tuple)
				const end = process.hrtime.bigint()

				expect(result.unwrapOrThrow()).toBeDefined()

				return end - start
			})

			const sumInNs = Number(result.reduce((a, b) => a + b, BigInt(0)))
			const avgInNs = Number(sumInNs) / result.length

			const sumInMs = nsToMs(sumInNs)
			const avgInMs = nsToMs(avgInNs)

			console.log(`Execution for ${result.length} elements took: ${sumInMs}ms (avg: ${avgInMs}ms)`)

			expect(avgInMs).toBeLessThan(0.1)
		})

		it('with subjectSet', () => {
			const relationTuples = Array.from({ length: 100 }, (_, i) => generateRelationTuple(i, true))

			const result = relationTuples.map((tuple) => {
				const start = process.hrtime.bigint()
				const result = parseRelationTuple(tuple)
				const end = process.hrtime.bigint()

				expect(result.unwrapOrThrow()).toBeDefined()

				return end - start
			})

			const sumInNs = Number(result.reduce((a, b) => a + b, BigInt(0)))
			const avgInNs = Number(sumInNs) / result.length

			const sumInMs = nsToMs(sumInNs)
			const avgInMs = nsToMs(avgInNs)

			console.log(`Execution for ${result.length} elements took: ${sumInMs}ms (avg: ${avgInMs}ms)`)

			expect(avgInMs).toBeLessThan(0.15)
		})
	})

	describe('rejects wrong syntax', () => {
		it.each([
			['asdfhg'],
			['object#relation'],
			['object@subject'],
			['object#relation@subject@sdf'],
			['object#relation@subjectObject#relation@sdf'],
			['object#relation@subjectObject#relation'],
			['namespace:object#relation@subjectObject#relation'],
			['object#relation@namespace:subjectObject#relation'],
			['object#relation@subjectId'],
		])('%s', (str) => {
			const result = parseRelationTuple(str)

			if (result.hasValue()) {
				console.log(`Result has value: `, result.value)
			}

			expect(result.unwrapErrorOrThrow()).toBeInstanceOf(RelationTupleSyntaxError)
		})
	})
})
