use crate::common::relationtuple::{
    RelationTuple, RelationTupleBuilder, RelationTupleParseError, Subject,
};

static INVALID_CHAR_IN_STRING_ERROR_MESSAGE: &str = "The characters ':#()' are not allowed as values";

fn parse_object_part<'a>(
    builder: &mut RelationTupleBuilder<'a>,
    string: &'a str,
) -> Result<(), RelationTupleParseError> {
    let mut parts = string.split(&[':', '#']);
    builder.namespace(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "namespace" })?,
    );
    builder.object(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "object" })?,
    );
    builder.relation(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "relation" })?,
    );

    match parts.next() {
        Some(_) => Err(RelationTupleParseError::SyntaxError { message: INVALID_CHAR_IN_STRING_ERROR_MESSAGE }),
        None => Ok(())
    }
}

fn remove_surrounding_parenthesis(string: &str) -> &str {
    if string.starts_with('(') && string.ends_with(')') {
        &string[1..string.len() - 1]
    } else {
        string
    }
}

fn  parse_subject_part<'a>(
    builder: &mut RelationTupleBuilder<'a>,
    string: &'a str,
) -> Result<(), RelationTupleParseError> {
    let string = remove_surrounding_parenthesis(string);
    let mut parts = string.split(&[':', '#']);

    let namespace_or_id = parts.next().ok_or(RelationTupleParseError::SyntaxError {
        message: "The subject has to have an SubjectId or SubjectSet",
    })?;

    let object = parts.next();

    if let Some(object) = object {
        builder.subject(Subject::Set {
            namespace: namespace_or_id,
            object: object,
            relation: parts.next().filter(|x| !x.is_empty()),
        });
    } else {
        builder.subject(Subject::Id(namespace_or_id));
    }

    match parts.next() {
        Some(_) => Err(RelationTupleParseError::SyntaxError { message: INVALID_CHAR_IN_STRING_ERROR_MESSAGE }),
        None => Ok(())
    }
}

// ns:obj#rel@sns:sobj#srel
impl<'a> RelationTuple<'a> {
    pub fn from_str(relation_tuple: &'a str) -> Result<RelationTuple<'a>, RelationTupleParseError> {
        let relation_tuple = relation_tuple.trim();

        if relation_tuple.len() == 0 {
            return Err(RelationTupleParseError::SyntaxError {
                message: "The string cannot be empty",
            });
        }
        let mut parts = relation_tuple.split('@');

        let mut relation_tuple_builder = RelationTupleBuilder::default();
        parse_object_part(
            &mut relation_tuple_builder,
            parts.next().ok_or(RelationTupleParseError::SyntaxError {
                message: "The string has to contain exactly one '@'",
            })?,
        )?;

        parse_subject_part(
            &mut relation_tuple_builder,
            parts.next().ok_or(RelationTupleParseError::SyntaxError {
                message: "The string has to contain exactly one '@'",
            })?,
        )?;

        relation_tuple_builder.build()
    }
}
