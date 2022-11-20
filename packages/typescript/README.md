# @nidomiro/relation-tuple-parser

[![npm version](https://badge.fury.io/js/@nidomiro%2Frelation-tuple-parser.svg)](https://www.npmjs.com/package/@nidomiro/relation-tuple-parser)

This library can parse a string representation of a Relation tuple to an object structure in typescript.

Relation tuples are used to evaluate permissions in "[Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/pub48190/)".

The [BNF](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) of a valid Relation tuple is as follows:

```BNF
<relation-tuple> ::= <object>'#'relation'@'<subject> | <object>'#'relation'@('<subject>')'
<object> ::= namespace':'object_id
<subject> ::= subject_id | <subject_set>
<subject_set> ::= <object>'#'relation
```

Examples of valid strings:

```
namespace:object#relation@subjectId
namespace:object#relation@(subjectId)
namespace:object#relation@subjectNamespace:subjectObject#subjectRelation
namespace:object#relation@(subjectNamespace:subjectObject#subjectRelation)
```

The different parts of the Relation tuple can contain any character but `:#@()`.

A Relation tuple can easily be verbalised:
The Relation tuple `sharedFiles:a.txt#access@(dirs:b#access)` can be verbalised as "Anyone with `access` to `dirs:b`
has `access` to `sharedFiles:a.txt`".

After Parsing you get an object in the format:

```ts
interface SubjectSet {
	namespace: string
	object: string
	relation: string
}

interface RelationTuple {
	namespace: string
	object: string
	relation: string
	subjectIdOrSet: string | SubjectSet
}
```

## Usage

```ts
import { parseRelationTuple } from '@nidomiro/relation-tuple-parser'

const result = parseRelationTuple('sharedFiles:a.txt#access@(dirs:b#access)')
const value = result.unwrapOrThrow()
/* value = {
				namespace: 'sharedFiles',
				object: 'a.txt',
				relation: 'access',
				subjectIdOrSet: {
					namespace: 'dirs',
					object: 'b',
					relation: 'access',
				},
			}
 */
```

## With replacements

It is also possible to parse the Relation tuple in a structure where different placeholders can be replaced.
This is especially useful if you define a Guard via Decorators but require som dynamic replacements e.g. for the id of
the current user.

### Usage

```ts
import { parseRelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'

const result = parseRelationTupleWithReplacements(({ userId }) => `groups:admin#member@${userId}`)

/**
 * Contains the "Template" of the Relation tuple with the replacements defined above.
 * Calculate this once and use it on every evaluation.
 */
const valueWithreplacements = result.unwrapOrThrow()

/**
 * Execute this at evaluation time (e.g. every incomming Request) to get the actual Relation tuple to evaluate against.
 */
const relationTuple = applyReplacements(valueWithreplacements, {
	userId: 'my_user_id',
})

/*	relationTuple = {
						namespace: 'groups',
						object: 'admin',
						relation: 'member',
						subjectIdOrSet: 'my_user_id',
					}
 */
```

## Development

### Building

Run `nx build typescript` to build the library.

### Running unit tests

Run `nx test typescript` to execute the unit tests.

### Publish

Make sure you are logged into npm.

Run `nx publish typescript --tag latest --ver x.x.x` to publish to npm.
