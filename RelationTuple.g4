grammar RelationTuple;

relationTuple:      namespacedObject '#' relation=STRING '@' subject EOF;

namespacedObject:   namespace=STRING ':' object=STRING;

subject:            subjectId
                    | subjectSet
                    | '(' subjectId ')'
                    | '(' subjectSet ')'
                    ;

subjectId:          STRING;

subjectSet:         subjectNamespacedObject=namespacedObject '#' (subjectRelation=STRING)?
                    | subjectNamespacedObject=namespacedObject
                    ;

STRING: CHAR+;
CHAR: ~[:#@()];

