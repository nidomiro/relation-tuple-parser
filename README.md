# relation-tuple-parser

This is a collection of libraries that can parse a string representation of a Relation tuple to an object structure in different languages or frameworks.

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

## Repository content

-   [@nidomiro/relation-tuple-parser](./packages/typescript): A typescript implementation including dynamic value replacements
-   [@nidomiro/relation-tuple-parser-ory-grpc](./packages/typescript-ory-grpc): same as `@nidomiro/relation-tuple-parser` but uses grpc types from ory keto

## Development Info

### Publish typescript versions

```bash
nx run-many --projects=typescript,typescript-ory-grpc --target=publish --tag latest --ver x.x.x
```
