use crate::common::relationtuple::{
    RelationTuple, RelationTupleBuilder, RelationTupleParseError, Subject,
};

fn parse_object_part(
    builder: &mut RelationTupleBuilder,
    string: &str,
) -> Result<(), RelationTupleParseError> {
    let mut parts = string.split(&[':', '#']);
    builder.namespace(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "namespace" })?
            .into(),
    );
    builder.object(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "object" })?
            .into(),
    );
    builder.relation(
        parts
            .next()
            .ok_or(RelationTupleParseError::FieldCannotBeNone { field: "relation" })?
            .into(),
    );

    Ok(())
}

fn parse_subject_part(
    builder: &mut RelationTupleBuilder,
    string: &str,
) -> Result<(), RelationTupleParseError> {
    let mut string = string;

    if string.starts_with('(') && string.ends_with(')') {
        string = &string[1..string.len() - 1];
    }

    let mut parts = string.split(&[':', '#']);
    let namespace_or_id = parts.next().ok_or(RelationTupleParseError::SyntaxError {
        message: "The subject has to have an SubjectId or SubjectSet",
    })?;

    let object = parts.next();

    if object == None {
        builder.subject(Subject::Id(namespace_or_id.into()));
        return Ok(());
    }

    builder.subject(Subject::Set {
        namespace: namespace_or_id.into(),
        object: object.unwrap().into(),
        relation: parts.next().filter(|x| x.len() > 0).map(|x| x.into()),
    });

    Ok(())
}

// ns:obj#rel@sns:sobj#srel
impl RelationTuple {
    pub fn from_str_split(relation_tuple: &str) -> Result<RelationTuple, RelationTupleParseError> {
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
