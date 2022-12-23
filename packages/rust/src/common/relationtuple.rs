use derive_builder::Builder;

#[derive(Debug, PartialEq)]
pub enum RelationTupleParseError {
    FieldCannotBeNone { field: &'static str },
    SyntaxError { message: &'static str },
}

impl From<derive_builder::UninitializedFieldError> for RelationTupleParseError {
    fn from(err: derive_builder::UninitializedFieldError) -> Self {
        Self::FieldCannotBeNone {
            field: err.field_name(),
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum Subject<'a> {
    Id(&'a str),
    Set {
        namespace: &'a str,
        object: &'a str,
        relation: Option<&'a str>,
    },
}

#[derive(Builder, Debug, PartialEq)]
#[builder(derive(Debug, PartialEq), build_fn(error = "RelationTupleParseError"))]
pub struct RelationTuple<'a> {
    pub namespace: &'a str,
    pub object: &'a str,
    pub relation: &'a str,
    pub subject: Subject<'a>,
}
