import { ReplaceableString } from './relation-tuple-with-replacements'

export type ModifyTypeOfAttribute<T, R extends { [k in keyof T]: unknown }> = Omit<T, keyof R> & R

export const generateReplacerFunction = <T extends Record<string, string>>(
	str: string,
	possibleReplacements: Map<keyof T, string>,
): ReplaceableString<T> => {
	const indices = new Map<keyof T, number>()

	possibleReplacements.forEach((value, key) => {
		const index = str.indexOf(value)
		if (index >= 0) {
			indices.set(key, index)
		}
	})

	if (indices.size <= 0) {
		return () => str
	}

	//TODO: increase performance

	return (replacements) => {
		let ret = str
		indices.forEach((value, key) => {
			ret = ret.replace(possibleReplacements.get(key) as string, replacements[key])
		})
		return ret
	}
}
