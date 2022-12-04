#![allow(nonstandard_style)]
// Generated from ../../RelationTuple.g4 by ANTLR 4.8
use super::relationtupleparser::*;
use antlr_rust::tree::ParseTreeListener;

pub trait RelationTupleListener<'input>:
    ParseTreeListener<'input, RelationTupleParserContextType>
{
    /**
     * Enter a parse tree produced by {@link RelationTupleParser#relationTuple}.
     * @param ctx the parse tree
     */
    fn enter_relationTuple(&mut self, _ctx: &RelationTupleContext<'input>) {}
    /**
     * Exit a parse tree produced by {@link RelationTupleParser#relationTuple}.
     * @param ctx the parse tree
     */
    fn exit_relationTuple(&mut self, _ctx: &RelationTupleContext<'input>) {}
    /**
     * Enter a parse tree produced by {@link RelationTupleParser#namespacedObject}.
     * @param ctx the parse tree
     */
    fn enter_namespacedObject(&mut self, _ctx: &NamespacedObjectContext<'input>) {}
    /**
     * Exit a parse tree produced by {@link RelationTupleParser#namespacedObject}.
     * @param ctx the parse tree
     */
    fn exit_namespacedObject(&mut self, _ctx: &NamespacedObjectContext<'input>) {}
    /**
     * Enter a parse tree produced by {@link RelationTupleParser#subject}.
     * @param ctx the parse tree
     */
    fn enter_subject(&mut self, _ctx: &SubjectContext<'input>) {}
    /**
     * Exit a parse tree produced by {@link RelationTupleParser#subject}.
     * @param ctx the parse tree
     */
    fn exit_subject(&mut self, _ctx: &SubjectContext<'input>) {}
    /**
     * Enter a parse tree produced by {@link RelationTupleParser#subjectId}.
     * @param ctx the parse tree
     */
    fn enter_subjectId(&mut self, _ctx: &SubjectIdContext<'input>) {}
    /**
     * Exit a parse tree produced by {@link RelationTupleParser#subjectId}.
     * @param ctx the parse tree
     */
    fn exit_subjectId(&mut self, _ctx: &SubjectIdContext<'input>) {}
    /**
     * Enter a parse tree produced by {@link RelationTupleParser#subjectSet}.
     * @param ctx the parse tree
     */
    fn enter_subjectSet(&mut self, _ctx: &SubjectSetContext<'input>) {}
    /**
     * Exit a parse tree produced by {@link RelationTupleParser#subjectSet}.
     * @param ctx the parse tree
     */
    fn exit_subjectSet(&mut self, _ctx: &SubjectSetContext<'input>) {}
}

antlr_rust::coerce_from! { 'input : RelationTupleListener<'input> }
