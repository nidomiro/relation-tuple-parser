import { TwoWayMap } from '../util/two-way-map'
import { ReplaceableString } from './relation-tuple-with-replacements'

function findReplacementsInString<T extends Record<string, string>>(
	str: string,
	possibleReplacements: TwoWayMap<keyof T, string>,
): Array<{ start: number; endExcl: number; prop: keyof T }> {
	const regexStr = `(${Array.from(possibleReplacements.values()).join('|')})`
	const regex = new RegExp(regexStr, 'g')

	return Array.from(str.matchAll(regex)).flatMap((x) => {
		if (x.index == null) {
			return []
		}

		const value = x.values().next().value
		return [
			{
				start: x.index,
				endExcl: x.index + value.length,
				prop: possibleReplacements.getByValue(value) as keyof T,
			},
		]
	})
}

function generateReplacerFunctions<T extends Record<string, string>>(
	sortedFoundReplacements: Array<{ start: number; endExcl: number; prop: keyof T }>,
	str: string,
) {
	const resultStringParts: Array<ReplaceableString<T>> = []

	let pos = 0
	sortedFoundReplacements.forEach(({ start, endExcl, prop }) => {
		const strPart = str.substring(pos, Math.max(0, start)) // let calculation happen before
		resultStringParts.push(() => strPart)
		resultStringParts.push((replacements) => replacements[prop])

		pos = endExcl
	})

	if (pos < str.length) {
		const strPart = str.substring(pos, str.length)
		resultStringParts.push(() => strPart)
	}
	return resultStringParts
}

export const generateReplacerFunction = <T extends Record<string, string>>(
	str: string,
	possibleReplacements: TwoWayMap<keyof T, string>,
): ReplaceableString<T> => {
	const foundReplacements = findReplacementsInString(str, possibleReplacements)

	if (foundReplacements.length <= 0) {
		return () => str
	} else if (foundReplacements.length === 1) {
		return (replacements) => replacements[foundReplacements[0].prop]
	}

	const sortedFoundReplacements = foundReplacements.sort((a, b) => a.start - b.start)

	const resultStringParts = generateReplacerFunctions(sortedFoundReplacements, str)

	return (replacements) => {
		return resultStringParts.map((x) => x(replacements)).join('')
	}
}
