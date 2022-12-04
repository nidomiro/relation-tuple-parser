mod antlr;
mod common;

use antlr_rust::common_token_stream::CommonTokenStream;
use antlr_rust::{InputStream};
use antlr_rust::token_factory::CommonTokenFactory;
use antlr_rust::tree::{Visitable};
use crate::antlr::{RelationTupleLexer, RelationTupleParser, MyRelationTupleParser};

use crate::common::relationtuple::{RelationTuple, RelationTupleParseError};


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

    visitor.relation_tuple_builder.build()
  }
}


#[cfg(test)]
mod tests {
  use std::time::SystemTime;
  use crate::common::relationtuple::Subject::{Id, Set};
  use super::*;

  #[test]
  fn test_valid_syntax() {
    let result = RelationTuple::from_str("myNamespace:myObject#myRelation@mySubjectId");
    assert_eq!(result, Ok(RelationTuple {
      namespace: "myNamespace".into(),
      object: "myObject".into(),
      relation: "myRelation".into(),
      subject: Id("mySubjectId".into()),
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
      },
    }));
  }

  #[test]
  fn benchmark_parser_subject_set() {
    let count = 100;
    let now = SystemTime::now();
    (0..count).for_each(|_| { RelationTuple::from_str("myNamespace:myObject#myRelation@mySubjectNamespace:mySubjectObject#mySubjectRelation").unwrap(); });
    match now.elapsed() {
      Ok(elapsed) => {
        // it prints '2'
        println!("executing parse for {count} elements took {}ms ({}ms per parse)", elapsed.as_millis(), elapsed.as_millis() as f64 / count as f64);
      }
      Err(e) => {
        // an error occurred!
        println!("Error: {e:?}");
      }
    }
  }
}
