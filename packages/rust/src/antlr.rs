#![allow(non_snake_case)]

use antlr_rust::rule_context::RuleContext;
use antlr_rust::TidExt;
use antlr_rust::token::Token;
use antlr_rust::tree::{ParseTree, ParseTreeVisitor};


pub use relationtuplelexer::*;
pub use relationtupleparser::*;
pub use relationtuplevisitor::*;
pub use relationtuplelistener::*;
use crate::common::relationtuple::{Subject, RelationTupleBuilder};


pub mod relationtuplelexer;
pub mod relationtupleparser;
pub mod relationtuplevisitor;
pub mod relationtuplelistener;


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

    #[allow(non_snake_case)] if ctx.get_parent_ctx().unwrap().is::<SubjectSetContext>() {
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

    self.relation_tuple_builder.subject(Subject::Id(ctx.get_text()));
  }
  fn visit_subjectSet(&mut self, ctx: &SubjectSetContext<'_>){
    self.visit_children(ctx);

    let namespace_object = ctx.subjectNamespacedObject.as_ref().unwrap();
    self.relation_tuple_builder.subject(Subject::Set {
      namespace: namespace_object.namespace.as_ref().unwrap().get_text().into(),
      object: namespace_object.object.as_ref().unwrap().get_text().into(),
      relation: ctx.subjectRelation.as_ref().map(|x| x.get_text().into())
    });
  }
}
