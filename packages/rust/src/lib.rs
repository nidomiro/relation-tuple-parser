mod antlr;

use antlr_rust::common_token_stream::CommonTokenStream;
use antlr_rust::{InputStream, TidExt};
use antlr_rust::rule_context::RuleContext;
use antlr_rust::token::Token;
use antlr_rust::token_factory::CommonTokenFactory;
use antlr_rust::tree::{ParseTree, ParseTreeVisitor, ParseTreeVisitorCompat, Visitable};
use crate::antlr::{RelationTupleLexer, RelationTupleParser, RelationTupleVisitor, RelationTupleParserContextType, NamespacedObjectContext, RelationTupleContext, SubjectContext, SubjectIdContext, SubjectSetContext, SubjectContextAttrs, RelationTupleVisitorCompat};
use crate::Subject::{Id, Set};

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
      subject: Id(String::new()),
    }
  }
}


pub struct MyRelationTupleParser {
  pub(crate) relation_tuple_builder: RelationTupleBuilder,
}

impl ParseTreeVisitor<'_, RelationTupleParserContextType> for MyRelationTupleParser {}

impl RelationTupleVisitor<'_> for MyRelationTupleParser {
  fn visit_relationTuple(&mut self, ctx: &RelationTupleContext<'_>) {
    self.visit_children(ctx);

    self.relation_tuple_builder.relation(ctx.relation.as_ref().unwrap().get_text().into());

  }

  fn visit_namespacedObject(&mut self, ctx: &NamespacedObjectContext<'_>) {
    self.visit_children(ctx);

    if(ctx.get_parent_ctx().unwrap().is::<SubjectSetContext>()) {
      return;
    }

    self.relation_tuple_builder.namespace(ctx.namespace.as_ref().unwrap().get_text().into());
    self.relation_tuple_builder.object(ctx.object.as_ref().unwrap().get_text().into());
  }

  fn visit_subject(&mut self, ctx: &SubjectContext<'_>){
    self.visit_children(ctx);
  }

  fn visit_subjectId(&mut self, ctx: &SubjectIdContext<'_>){
    self.visit_children(ctx);

    self.relation_tuple_builder.subject(Id(ctx.get_text()));
  }
  fn visit_subjectSet(&mut self, ctx: &SubjectSetContext<'_>){
    self.visit_children(ctx);

    let namespace_object = ctx.subjectNamespacedObject.as_ref().unwrap();
    self.relation_tuple_builder.subject(Set {
      namespace: namespace_object.namespace.as_ref().unwrap().get_text().into(),
      object: namespace_object.object.as_ref().unwrap().get_text().into(),
      relation: ctx.subjectRelation.as_ref().map(|x| x.get_text().into())
    });
  }
}


impl RelationTuple {
  fn from_str(relation_tuple: &str) -> Result<RelationTuple, RelationTupleParseError> {
    let token_factory = CommonTokenFactory::default();
    let lexer = RelationTupleLexer::new_with_token_factory(InputStream::new(relation_tuple.into()), &token_factory);
    let token_source = CommonTokenStream::new(lexer);
    let mut parser = RelationTupleParser::new(token_source);
    let parse_result = parser.relationTuple().expect("parsed unsuccessfully");
    let mut visitor = MyRelationTupleParser {
      relation_tuple_builder: Default::default(),
    };

    parse_result.accept(&mut visitor);

    println!("------");
    println!("{:?}", visitor.relation_tuple_builder);
    println!("------");

    visitor.relation_tuple_builder.build()
  }
}


#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_valid_syntax() {

    let result = RelationTuple::from_str("myNamespace:myObject#myRelation@mySubjectId");
    assert_eq!(result, Ok(RelationTuple {
      namespace: "myNamespace".into(),
      object: "myObject".into(),
      relation: "myRelation".into(),
      subject: Id("mySubjectId".into())
    }));


    let result = RelationTuple::from_str("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject#mySubjectRelation");
    assert_eq!(result, Ok(RelationTuple {
      namespace: "myNamespace".into(),
      object: "myObject".into(),
      relation: "myRelation".into(),
      subject: Set {
        namespace: "mySubjectNamespace".into(),
        object: "mySubjectObject".into(),
        relation: Some("mySubjectRelation".into()),
      }
    }));
  }
}
