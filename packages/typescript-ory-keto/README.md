# @nidomiro/relation-tuple-parser-ory-keto

[![npm version](https://badge.fury.io/js/@nidomiro%2Frelation-tuple-parser-ory-keto.svg)](https://www.npmjs.com/package/@nidomiro/relation-tuple-parser-ory-keto)

This library is the same as `@nidomiro/relation-tuple-parser` but uses grpc types of [ory keto](https://www.ory.sh/docs/keto/).

## Usage

```ts
import { parseRelationTuple } from '@nidomiro/relation-tuple-parser'
import { KetoGrpcConverter, KetoHttpConverter } from '@nidomiro/relation-tuple-parser-ory-keto'

const result = parseRelationTuple('sharedFiles:a.txt#access@(dirs:b#access)').unwrapOrThrow()

const grpcRelationTuple = KetoGrpcConverter.createRelationTuple(result)
const grpcCheckRequest = KetoGrpcConverter.createCheckRequest(result)
const httpRelationTuple = KetoHttpConverter.createRelationTuple(result)
const httpRelationQuery = KetoHttpConverter.createRelationQuery(result)
```

## With replacements

It is also possible to parse the Relation tuple in a structure where different placeholders can be replaced.
This is especially useful if you define a Guard via Decorators but require som dynamic replacements e.g. for the id of
the current user.

### Usage

```ts
import { parseRelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import { KetoGrpcConverter } from '@nidomiro/relation-tuple-parser-ory-keto'

const result = parseRelationTupleWithReplacements(({ userId }) => `groups:admin#member@${userId}`)

/**
 * Contains the "Template" of the Relation tuple with the replacements defined above.
 * Calculate this once and use it on every evaluation.
 */
const valueWithreplacements = result.unwrapOrThrow()

/**
 * Execute this at evaluation time (e.g. every incomming Request) to get the actual ory Relation tuple send to keto via grpc.
 */
const grpcCheckRequest = KetoGrpcConverter.createCheckRequest(valueWithreplacements, {
  userId: 'my_user_id',
})
```

## Development

### Building

Run `nx build typescript-ory-keto` to build the library.

### Running unit tests

Run `nx test typescript-ory-keto` to execute the unit tests.

### Publish

Make sure you are logged into npm.

Run `nx publish typescript-ory-keto --tag latest --ver x.x.x` to publish to npm.
