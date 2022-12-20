mod antlr;
mod common;

pub use crate::common::relationtuple::{RelationTuple, RelationTupleParseError, Subject};

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::SystemTime;

    macro_rules! valid_relation_tuple_tests {
        ($($name:ident: $value:expr,)*) => {
        $(
            #[test]
            fn $name() {
                let (input, expected) = $value;
                assert_eq!(expected,  RelationTuple::from_str_split(input).unwrap());
            }
        )*
        }
    }

    valid_relation_tuple_tests! {
        valid_0: ("myNamespace:myObject#myRelation@mySubjectId", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Id("mySubjectId".into()),
        }),
        valid_1: ("myNamespace:myObject#myRelation@(mySubjectId)", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Id("mySubjectId".into()),
        }),
        valid_2: ("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject#mySubjectRelation", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: Some("mySubjectRelation".into()),
            },
        }),
        valid_3: ("myNamespace:myObject#myRelation@(mySubjectNamespace:mySubjectObject#mySubjectRelation)", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: Some("mySubjectRelation".into()),
            },
        }),

        valid_4: ("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject#", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: None,
            },
        }),
        valid_5: ("myNamespace:myObject#myRelation@(mySubjectNamespace:mySubjectObject#)", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: None,
            },
        }),

        valid_6: ("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: None,
            },
        }),
        valid_7: ("myNamespace:myObject#myRelation@(mySubjectNamespace:mySubjectObject)", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: None,
            },
        }),

        valid_8: ("  myNamespace:myObject#myRelation@(mySubjectNamespace:mySubjectObject)  ", RelationTuple {
            namespace: "myNamespace".into(),
            object: "myObject".into(),
            relation: "myRelation".into(),
            subject: Subject::Set {
                namespace: "mySubjectNamespace".into(),
                object: "mySubjectObject".into(),
                relation: None,
            },
        }),

    }

    macro_rules! invalid_relation_tuple_tests {
        ($($name:ident: $value:expr,)*) => {
        $(
            #[test]
            fn $name() {
                let (input, expected) = $value;
                assert_eq!(expected,  RelationTuple::from_str_split(input).unwrap_err());
            }
        )*
        }
    }

    invalid_relation_tuple_tests! {
        invalid_0: ("", RelationTupleParseError::SyntaxError { message: "The string cannot be empty" }),
        invalid_1: ("a", RelationTupleParseError::FieldCannotBeNone {field: "object"}),
        invalid_2: ("ns:object:#relation@subjectId", RelationTupleParseError::FieldCannotBeNone {field: "object"}),
    }

    #[test]
    fn benchmark_parser_subject_set() {
        let count = 100;
        let now = SystemTime::now();
        (0..count).for_each(|_| { RelationTuple::from_str_split("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject#mySubjectRelation").unwrap(); });
        match now.elapsed() {
            Ok(elapsed) => {
                // it prints '2'
                println!(
                    "executing parse for {count} elements took {}ms ({}ms per parse)",
                    elapsed.as_millis(),
                    elapsed.as_millis() as f64 / count as f64
                );
            }
            Err(e) => {
                // an error occurred!
                println!("Error: {e:?}");
            }
        }
    }
}
