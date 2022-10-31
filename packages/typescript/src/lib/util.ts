import { ReplaceableString } from './relation-tuple-with-replacements'
import { TwoWayMap } from './two-way-map'

export type ModifyTypeOfAttribute<T, R extends { [k in keyof T]: unknown }> = Omit<T, keyof R> & R

export const generateReplacerFunction = <T extends Record<string, string>>(
	str: string,
	possibleReplacements: TwoWayMap<keyof T, string>,
): ReplaceableString<T> => {
	const regexStr = `(${Array.from(possibleReplacements.values()).join('|')})`
	const regex = new RegExp(regexStr, 'g')

	const foundReplacements = Array.from(str.matchAll(regex)).flatMap((x) => {
		if (x.index == null) {
			return []
		}

		const value = x.values().next().value

		return [
			{
				start: x.index,
				endExcl: x.index + value.length,
				prop: possibleReplacements.getByValue(value) as string,
			},
		]
	})

	if (foundReplacements.length <= 0) {
		return () => str
	}

	const sortedFoundReplacements = foundReplacements.sort((a, b) => a.start - b.start)

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

	return (replacements) => {
		return resultStringParts.map((x) => x(replacements)).join('')
	}
}
