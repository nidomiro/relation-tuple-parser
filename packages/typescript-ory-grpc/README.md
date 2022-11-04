# @nidomiro/relation-tuple-parser-ory

## Usage

```ts
import { parseRelationTupleToOryGrpc } from '@nidomiro/relation-tuple-parser-ory-grpc'

const result = parseRelationTupleToOryGrpc('sharedFiles:a.txt#access@(dirs:b#access)')
const value = result.unwrapOrThrow()
```

## With replacements

It is also possible to parse the Relation tuple in a structure where different placeholders can be replaced.
This is especially useful if you define a Guard via Decorators but require som dynamic replacements e.g. for the id of
the current user.

### Usage

```ts
import { parseRelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser-ory-grpc'

const result = parseRelationTupleWithReplacements(({ userId }) => `groups:admin#member@${userId}`)

/**
 * Contains the "Template" of the Relation tuple with the replacements defined above.
 * Calculate this once and use it on every evaluation.
 */
const valueWithreplacements = result.unwrapOrThrow()

/**
 * Execute this at evaluation time (e.g. every incomming Request) to get the actual ory Relation tuple send to keto via grpc.
 */
const relationTuple = convertRelationTupleWithReplacementsToOryGrpc(valueWithreplacements, {
	userId: 'my_user_id',
})
```

## Building

Run `nx build typescript-ory-grpc` to build the library.

## Running unit tests

Run `nx test typescript-ory-grpc` to execute the unit tests.

## Publish

Make sure you are logged into npm.

Run `nx publish typescript-ory-grpc --ver x.x.x --tag latest` to publish to npm.
