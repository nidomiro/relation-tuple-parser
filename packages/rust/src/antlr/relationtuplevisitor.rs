#![allow(nonstandard_style)]
// Generated from ./RelationTuple.g4 by ANTLR 4.8
use antlr_rust::tree::{ParseTreeVisitor,ParseTreeVisitorCompat};
use super::relationtupleparser::*;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link RelationTupleParser}.
 */
pub trait RelationTupleVisitor<'input>: ParseTreeVisitor<'input,RelationTupleParserContextType>{
	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#relationTuple}.
	 * @param ctx the parse tree
	 */
	fn visit_relationTuple(&mut self, ctx: &RelationTupleContext<'input>) { self.visit_children(ctx) }

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#namespacedObject}.
	 * @param ctx the parse tree
	 */
	fn visit_namespacedObject(&mut self, ctx: &NamespacedObjectContext<'input>) { self.visit_children(ctx) }

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subject}.
	 * @param ctx the parse tree
	 */
	fn visit_subject(&mut self, ctx: &SubjectContext<'input>) { self.visit_children(ctx) }

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subjectId}.
	 * @param ctx the parse tree
	 */
	fn visit_subjectId(&mut self, ctx: &SubjectIdContext<'input>) { self.visit_children(ctx) }

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subjectSet}.
	 * @param ctx the parse tree
	 */
	fn visit_subjectSet(&mut self, ctx: &SubjectSetContext<'input>) { self.visit_children(ctx) }

}

pub trait RelationTupleVisitorCompat<'input>:ParseTreeVisitorCompat<'input, Node= RelationTupleParserContextType>{
	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#relationTuple}.
	 * @param ctx the parse tree
	 */
		fn visit_relationTuple(&mut self, ctx: &RelationTupleContext<'input>) -> Self::Return {
			self.visit_children(ctx)
		}

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#namespacedObject}.
	 * @param ctx the parse tree
	 */
		fn visit_namespacedObject(&mut self, ctx: &NamespacedObjectContext<'input>) -> Self::Return {
			self.visit_children(ctx)
		}

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subject}.
	 * @param ctx the parse tree
	 */
		fn visit_subject(&mut self, ctx: &SubjectContext<'input>) -> Self::Return {
			self.visit_children(ctx)
		}

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subjectId}.
	 * @param ctx the parse tree
	 */
		fn visit_subjectId(&mut self, ctx: &SubjectIdContext<'input>) -> Self::Return {
			self.visit_children(ctx)
		}

	/**
	 * Visit a parse tree produced by {@link RelationTupleParser#subjectSet}.
	 * @param ctx the parse tree
	 */
		fn visit_subjectSet(&mut self, ctx: &SubjectSetContext<'input>) -> Self::Return {
			self.visit_children(ctx)
		}

}

impl<'input,T> RelationTupleVisitor<'input> for T
where
	T: RelationTupleVisitorCompat<'input>
{
	fn visit_relationTuple(&mut self, ctx: &RelationTupleContext<'input>){
		let result = <Self as RelationTupleVisitorCompat>::visit_relationTuple(self, ctx);
        *<Self as ParseTreeVisitorCompat>::temp_result(self) = result;
	}

	fn visit_namespacedObject(&mut self, ctx: &NamespacedObjectContext<'input>){
		let result = <Self as RelationTupleVisitorCompat>::visit_namespacedObject(self, ctx);
        *<Self as ParseTreeVisitorCompat>::temp_result(self) = result;
	}

	fn visit_subject(&mut self, ctx: &SubjectContext<'input>){
		let result = <Self as RelationTupleVisitorCompat>::visit_subject(self, ctx);
        *<Self as ParseTreeVisitorCompat>::temp_result(self) = result;
	}

	fn visit_subjectId(&mut self, ctx: &SubjectIdContext<'input>){
		let result = <Self as RelationTupleVisitorCompat>::visit_subjectId(self, ctx);
        *<Self as ParseTreeVisitorCompat>::temp_result(self) = result;
	}

	fn visit_subjectSet(&mut self, ctx: &SubjectSetContext<'input>){
		let result = <Self as RelationTupleVisitorCompat>::visit_subjectSet(self, ctx);
        *<Self as ParseTreeVisitorCompat>::temp_result(self) = result;
	}

}