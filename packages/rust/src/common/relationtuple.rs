use crate::antlr::{MyRelationTupleParser, RelationTupleLexer, RelationTupleParser};
use antlr_rust::common_token_stream::CommonTokenStream;
use antlr_rust::token_factory::CommonTokenFactory;
use antlr_rust::tree::Visitable;
use antlr_rust::InputStream;
use derive_builder::Builder;

#[derive(Debug, PartialEq)]
pub enum RelationTupleParseError {
    FieldCannotBeNone { field: &'static str },
}

impl From<derive_builder::UninitializedFieldError> for RelationTupleParseError {
    fn from(err: derive_builder::UninitializedFieldError) -> Self {
        Self::FieldCannotBeNone {
            field: err.field_name(),
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum Subject {
    Id(String),
    Set {
        namespace: String,
        object: String,
        relation: Option<String>,
    },
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

impl RelationTuple {
    pub fn from_str(relation_tuple: &str) -> Result<RelationTuple, RelationTupleParseError> {
        let relation_tuple = relation_tuple.trim();
        if relation_tuple.is_empty() {
            RelationTupleBuilder::default().build()?;
        }

        let token_factory = CommonTokenFactory::default();
        let lexer = RelationTupleLexer::new_with_token_factory(
            InputStream::new(relation_tuple.into()),
            &token_factory,
        );
        let token_source = CommonTokenStream::new(lexer);
        let mut parser = RelationTupleParser::new(token_source);
        let parse_result = parser.relationTuple().expect("parsed unsuccessfully");
        let mut visitor = MyRelationTupleParser {
            relation_tuple_builder: Default::default(),
        };

        parse_result.accept(&mut visitor);

        visitor.relation_tuple_builder.build()
    }
}
