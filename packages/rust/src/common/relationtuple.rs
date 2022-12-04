
use derive_builder::Builder;

#[derive(Debug, PartialEq)]
pub enum RelationTupleParseError {
  FieldCannotBeNone { field: &'static str }
}

impl From<derive_builder::UninitializedFieldError> for RelationTupleParseError {
  fn from(err: derive_builder::UninitializedFieldError) -> Self {
    Self::FieldCannotBeNone {field: err.field_name()}
  }
}


#[derive(Clone, Debug, PartialEq)]
pub enum Subject {
  Id(String),
  Set { namespace: String, object: String, relation: Option<String> },
}

#[derive(Builder, Debug, PartialEq)]
#[builder(derive(Debug, PartialEq), build_fn(error = "RelationTupleParseError"))]
pub struct RelationTuple {
  pub namespace: String,
  pub object: String,
  pub relation: String,
  pub subject: Subject,
}

impl Default for RelationTuple {
  fn default() -> Self {
    RelationTuple {
      namespace: String::new(),
      object: String::new(),
      relation: String::new(),
      subject: Subject::Id(String::new()),
    }
  }
}
