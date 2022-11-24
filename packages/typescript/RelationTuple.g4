grammar RelationTuple;

relationTuple:      namespacedObject '#' relation=STRING '@' subject EOF;

namespacedObject:   namespace=STRING ':' object=STRING;

subject:            subjectId
                    | subjectSet
                    | '(' subjectId ')'
                    | '(' subjectSet ')'
                    ;

subjectId:          STRING;

subjectSet:         namespacedObject '#' (subjectRelation=STRING)?
                    | namespacedObject
                    ;

STRING: CHAR+;
CHAR: ~[:#@()];

