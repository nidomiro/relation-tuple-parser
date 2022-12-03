mod antlr;

use antlr_rust::common_token_stream::CommonTokenStream;
use antlr_rust::InputStream;
use antlr_rust::token_factory::CommonTokenFactory;
use antlr_rust::tree::{ParseTreeVisitorCompat, Visitable};
use crate::antlr::{RelationTupleLexer, RelationTupleParser, RelationTupleVisitor, RelationTupleParserContextType};
use crate::Subject::Id;

#[derive(Debug)]
pub enum Subject {
  Id(String),
  Set { namespace: String, object: String, relation: Option<String> },
}

#[derive(Debug)]
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
      subject: Id(String::new())
    }
  }
}


pub struct MyRelationTupleParser {
  pub(crate) relation_tuple: RelationTuple,
}

impl ParseTreeVisitorCompat<'_> for MyRelationTupleParser {
  type Node = RelationTupleParserContextType;
  type Return = RelationTuple;

  fn temp_result(&mut self) -> &mut Self::Return {
    &mut self.relation_tuple
  }

  fn aggregate_results(&self, aggregate: Self::Return, next: Self::Return) -> Self::Return {
    aggregate
  }
}

impl RelationTupleVisitor<'_> for MyRelationTupleParser {
}


impl RelationTuple {
  fn from_str(relation_tuple: &str) -> () {
    let token_factory = CommonTokenFactory::default();
    let lexer = RelationTupleLexer::new_with_token_factory(InputStream::new(relation_tuple.into()), &token_factory);
    let token_source = CommonTokenStream::new(lexer);
    let mut parser = RelationTupleParser::new(token_source);
    let result = parser.relationTuple().expect("parsed unsuccessfully");
    let mut visitor = MyRelationTupleParser{
      relation_tuple: Default::default(),
    };

    result.accept(&mut visitor);

    println!("------");
    println!("{:?}", visitor.relation_tuple);
    println!("------");
  }
}


#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    RelationTuple::from_str("ns:obj#relation@subjectId")
  }
}
