// Generated from ./RelationTuple.g4 by ANTLR 4.8
#![allow(dead_code)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(nonstandard_style)]
#![allow(unused_imports)]
#![allow(unused_mut)]
#![allow(unused_braces)]
use antlr_rust::PredictionContextCache;
use antlr_rust::parser::{Parser, BaseParser, ParserRecog, ParserNodeType};
use antlr_rust::token_stream::TokenStream;
use antlr_rust::TokenSource;
use antlr_rust::parser_atn_simulator::ParserATNSimulator;
use antlr_rust::errors::*;
use antlr_rust::rule_context::{BaseRuleContext, CustomRuleContext, RuleContext};
use antlr_rust::recognizer::{Recognizer,Actions};
use antlr_rust::atn_deserializer::ATNDeserializer;
use antlr_rust::dfa::DFA;
use antlr_rust::atn::{ATN, INVALID_ALT};
use antlr_rust::error_strategy::{ErrorStrategy, DefaultErrorStrategy};
use antlr_rust::parser_rule_context::{BaseParserRuleContext, ParserRuleContext,cast,cast_mut};
use antlr_rust::tree::*;
use antlr_rust::token::{TOKEN_EOF,OwningToken,Token};
use antlr_rust::int_stream::EOF;
use antlr_rust::vocabulary::{Vocabulary,VocabularyImpl};
use antlr_rust::token_factory::{CommonTokenFactory,TokenFactory, TokenAware};
use super::relationtuplelistener::*;
use super::relationtuplevisitor::*;

use antlr_rust::lazy_static;
use antlr_rust::{TidAble,TidExt};

use std::marker::PhantomData;
use std::sync::Arc;
use std::rc::Rc;
use std::convert::TryFrom;
use std::cell::RefCell;
use std::ops::{DerefMut, Deref};
use std::borrow::{Borrow,BorrowMut};
use std::any::{Any,TypeId};

		pub const T__0:isize=1; 
		pub const T__1:isize=2; 
		pub const T__2:isize=3; 
		pub const T__3:isize=4; 
		pub const T__4:isize=5; 
		pub const STRING:isize=6; 
		pub const CHAR:isize=7;
	pub const RULE_relationTuple:usize = 0; 
	pub const RULE_namespacedObject:usize = 1; 
	pub const RULE_subject:usize = 2; 
	pub const RULE_subjectId:usize = 3; 
	pub const RULE_subjectSet:usize = 4;
	pub const ruleNames: [&'static str; 5] =  [
		"relationTuple", "namespacedObject", "subject", "subjectId", "subjectSet"
	];


	pub const _LITERAL_NAMES: [Option<&'static str>;6] = [
		None, Some("'#'"), Some("'@'"), Some("':'"), Some("'('"), Some("')'")
	];
	pub const _SYMBOLIC_NAMES: [Option<&'static str>;8]  = [
		None, None, None, None, None, None, Some("STRING"), Some("CHAR")
	];
	lazy_static!{
	    static ref _shared_context_cache: Arc<PredictionContextCache> = Arc::new(PredictionContextCache::new());
		static ref VOCABULARY: Box<dyn Vocabulary> = Box::new(VocabularyImpl::new(_LITERAL_NAMES.iter(), _SYMBOLIC_NAMES.iter(), None));
	}


type BaseParserType<'input, I> =
	BaseParser<'input,RelationTupleParserExt<'input>, I, RelationTupleParserContextType , dyn RelationTupleListener<'input> + 'input >;

type TokenType<'input> = <LocalTokenFactory<'input> as TokenFactory<'input>>::Tok;
pub type LocalTokenFactory<'input> = CommonTokenFactory;

pub type RelationTupleTreeWalker<'input,'a> =
	ParseTreeWalker<'input, 'a, RelationTupleParserContextType , dyn RelationTupleListener<'input> + 'a>;

/// Parser for RelationTuple grammar
pub struct RelationTupleParser<'input,I,H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	base:BaseParserType<'input,I>,
	interpreter:Arc<ParserATNSimulator>,
	_shared_context_cache: Box<PredictionContextCache>,
    pub err_handler: H,
}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn get_serialized_atn() -> &'static str { _serializedATN }

    pub fn set_error_strategy(&mut self, strategy: H) {
        self.err_handler = strategy
    }

    pub fn with_strategy(input: I, strategy: H) -> Self {
		antlr_rust::recognizer::check_version("0","3");
		let interpreter = Arc::new(ParserATNSimulator::new(
			_ATN.clone(),
			_decision_to_DFA.clone(),
			_shared_context_cache.clone(),
		));
		Self {
			base: BaseParser::new_base_parser(
				input,
				Arc::clone(&interpreter),
				RelationTupleParserExt{
					_pd: Default::default(),
				}
			),
			interpreter,
            _shared_context_cache: Box::new(PredictionContextCache::new()),
            err_handler: strategy,
        }
    }

}

type DynStrategy<'input,I> = Box<dyn ErrorStrategy<'input,BaseParserType<'input,I>> + 'input>;

impl<'input, I> RelationTupleParser<'input, I, DynStrategy<'input,I>>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
{
    pub fn with_dyn_strategy(input: I) -> Self{
    	Self::with_strategy(input,Box::new(DefaultErrorStrategy::new()))
    }
}

impl<'input, I> RelationTupleParser<'input, I, DefaultErrorStrategy<'input,RelationTupleParserContextType>>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
{
    pub fn new(input: I) -> Self{
    	Self::with_strategy(input,DefaultErrorStrategy::new())
    }
}

/// Trait for monomorphized trait object that corresponds to the nodes of parse tree generated for RelationTupleParser
pub trait RelationTupleParserContext<'input>:
	for<'x> Listenable<dyn RelationTupleListener<'input> + 'x > + 
	for<'x> Visitable<dyn RelationTupleVisitor<'input> + 'x > + 
	ParserRuleContext<'input, TF=LocalTokenFactory<'input>, Ctx=RelationTupleParserContextType>
{}

antlr_rust::coerce_from!{ 'input : RelationTupleParserContext<'input> }

impl<'input, 'x, T> VisitableDyn<T> for dyn RelationTupleParserContext<'input> + 'input
where
    T: RelationTupleVisitor<'input> + 'x,
{
    fn accept_dyn(&self, visitor: &mut T) {
        self.accept(visitor as &mut (dyn RelationTupleVisitor<'input> + 'x))
    }
}

impl<'input> RelationTupleParserContext<'input> for TerminalNode<'input,RelationTupleParserContextType> {}
impl<'input> RelationTupleParserContext<'input> for ErrorNode<'input,RelationTupleParserContextType> {}

antlr_rust::tid! { impl<'input> TidAble<'input> for dyn RelationTupleParserContext<'input> + 'input }

antlr_rust::tid! { impl<'input> TidAble<'input> for dyn RelationTupleListener<'input> + 'input }

pub struct RelationTupleParserContextType;
antlr_rust::tid!{RelationTupleParserContextType}

impl<'input> ParserNodeType<'input> for RelationTupleParserContextType{
	type TF = LocalTokenFactory<'input>;
	type Type = dyn RelationTupleParserContext<'input> + 'input;
}

impl<'input, I, H> Deref for RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
    type Target = BaseParserType<'input,I>;

    fn deref(&self) -> &Self::Target {
        &self.base
    }
}

impl<'input, I, H> DerefMut for RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.base
    }
}

pub struct RelationTupleParserExt<'input>{
	_pd: PhantomData<&'input str>,
}

impl<'input> RelationTupleParserExt<'input>{
}
antlr_rust::tid! { RelationTupleParserExt<'a> }

impl<'input> TokenAware<'input> for RelationTupleParserExt<'input>{
	type TF = LocalTokenFactory<'input>;
}

impl<'input,I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>> ParserRecog<'input, BaseParserType<'input,I>> for RelationTupleParserExt<'input>{}

impl<'input,I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>> Actions<'input, BaseParserType<'input,I>> for RelationTupleParserExt<'input>{
	fn get_grammar_file_name(&self) -> & str{ "RelationTuple.g4"}

   	fn get_rule_names(&self) -> &[& str] {&ruleNames}

   	fn get_vocabulary(&self) -> &dyn Vocabulary { &**VOCABULARY }
}
//------------------- relationTuple ----------------
pub type RelationTupleContextAll<'input> = RelationTupleContext<'input>;


pub type RelationTupleContext<'input> = BaseParserRuleContext<'input,RelationTupleContextExt<'input>>;

#[derive(Clone)]
pub struct RelationTupleContextExt<'input>{
	pub relation: Option<TokenType<'input>>,
ph:PhantomData<&'input str>
}

impl<'input> RelationTupleParserContext<'input> for RelationTupleContext<'input>{}

impl<'input,'a> Listenable<dyn RelationTupleListener<'input> + 'a> for RelationTupleContext<'input>{
		fn enter(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.enter_every_rule(self);
			listener.enter_relationTuple(self);
		}
		fn exit(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.exit_relationTuple(self);
			listener.exit_every_rule(self);
		}
}

impl<'input,'a> Visitable<dyn RelationTupleVisitor<'input> + 'a> for RelationTupleContext<'input>{
	fn accept(&self,visitor: &mut (dyn RelationTupleVisitor<'input> + 'a)) {
		visitor.visit_relationTuple(self);
	}
}

impl<'input> CustomRuleContext<'input> for RelationTupleContextExt<'input>{
	type TF = LocalTokenFactory<'input>;
	type Ctx = RelationTupleParserContextType;
	fn get_rule_index(&self) -> usize { RULE_relationTuple }
	//fn type_rule_index() -> usize where Self: Sized { RULE_relationTuple }
}
antlr_rust::tid!{RelationTupleContextExt<'a>}

impl<'input> RelationTupleContextExt<'input>{
	fn new(parent: Option<Rc<dyn RelationTupleParserContext<'input> + 'input > >, invoking_state: isize) -> Rc<RelationTupleContextAll<'input>> {
		Rc::new(
			BaseParserRuleContext::new_parser_ctx(parent, invoking_state,RelationTupleContextExt{
				relation: None, 
				ph:PhantomData
			}),
		)
	}
}

pub trait RelationTupleContextAttrs<'input>: RelationTupleParserContext<'input> + BorrowMut<RelationTupleContextExt<'input>>{

fn namespacedObject(&self) -> Option<Rc<NamespacedObjectContextAll<'input>>> where Self:Sized{
	self.child_of_type(0)
}
fn subject(&self) -> Option<Rc<SubjectContextAll<'input>>> where Self:Sized{
	self.child_of_type(0)
}
/// Retrieves first TerminalNode corresponding to token EOF
/// Returns `None` if there is no child corresponding to token EOF
fn EOF(&self) -> Option<Rc<TerminalNode<'input,RelationTupleParserContextType>>> where Self:Sized{
	self.get_token(EOF, 0)
}
/// Retrieves first TerminalNode corresponding to token STRING
/// Returns `None` if there is no child corresponding to token STRING
fn STRING(&self) -> Option<Rc<TerminalNode<'input,RelationTupleParserContextType>>> where Self:Sized{
	self.get_token(STRING, 0)
}

}

impl<'input> RelationTupleContextAttrs<'input> for RelationTupleContext<'input>{}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn relationTuple(&mut self,)
	-> Result<Rc<RelationTupleContextAll<'input>>,ANTLRError> {
		let mut recog = self;
		let _parentctx = recog.ctx.take();
		let mut _localctx = RelationTupleContextExt::new(_parentctx.clone(), recog.base.get_state());
        recog.base.enter_rule(_localctx.clone(), 0, RULE_relationTuple);
        let mut _localctx: Rc<RelationTupleContextAll> = _localctx;
		let result: Result<(), ANTLRError> = (|| {

			//recog.base.enter_outer_alt(_localctx.clone(), 1);
			recog.base.enter_outer_alt(None, 1);
			{
			/*InvokeRule namespacedObject*/
			recog.base.set_state(10);
			recog.namespacedObject()?;

			recog.base.set_state(11);
			recog.base.match_token(T__0,&mut recog.err_handler)?;

			recog.base.set_state(12);
			let tmp = recog.base.match_token(STRING,&mut recog.err_handler)?;
			 cast_mut::<_,RelationTupleContext >(&mut _localctx).relation = Some(tmp.clone());
			  

			recog.base.set_state(13);
			recog.base.match_token(T__1,&mut recog.err_handler)?;

			/*InvokeRule subject*/
			recog.base.set_state(14);
			recog.subject()?;

			recog.base.set_state(15);
			recog.base.match_token(EOF,&mut recog.err_handler)?;

			}
			Ok(())
		})();
		match result {
		Ok(_)=>{},
        Err(e @ ANTLRError::FallThrough(_)) => return Err(e),
		Err(ref re) => {
				//_localctx.exception = re;
				recog.err_handler.report_error(&mut recog.base, re);
				recog.err_handler.recover(&mut recog.base, re)?;
			}
		}
		recog.base.exit_rule();

		Ok(_localctx)
	}
}
//------------------- namespacedObject ----------------
pub type NamespacedObjectContextAll<'input> = NamespacedObjectContext<'input>;


pub type NamespacedObjectContext<'input> = BaseParserRuleContext<'input,NamespacedObjectContextExt<'input>>;

#[derive(Clone)]
pub struct NamespacedObjectContextExt<'input>{
	pub namespace: Option<TokenType<'input>>,
	pub object: Option<TokenType<'input>>,
ph:PhantomData<&'input str>
}

impl<'input> RelationTupleParserContext<'input> for NamespacedObjectContext<'input>{}

impl<'input,'a> Listenable<dyn RelationTupleListener<'input> + 'a> for NamespacedObjectContext<'input>{
		fn enter(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.enter_every_rule(self);
			listener.enter_namespacedObject(self);
		}
		fn exit(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.exit_namespacedObject(self);
			listener.exit_every_rule(self);
		}
}

impl<'input,'a> Visitable<dyn RelationTupleVisitor<'input> + 'a> for NamespacedObjectContext<'input>{
	fn accept(&self,visitor: &mut (dyn RelationTupleVisitor<'input> + 'a)) {
		visitor.visit_namespacedObject(self);
	}
}

impl<'input> CustomRuleContext<'input> for NamespacedObjectContextExt<'input>{
	type TF = LocalTokenFactory<'input>;
	type Ctx = RelationTupleParserContextType;
	fn get_rule_index(&self) -> usize { RULE_namespacedObject }
	//fn type_rule_index() -> usize where Self: Sized { RULE_namespacedObject }
}
antlr_rust::tid!{NamespacedObjectContextExt<'a>}

impl<'input> NamespacedObjectContextExt<'input>{
	fn new(parent: Option<Rc<dyn RelationTupleParserContext<'input> + 'input > >, invoking_state: isize) -> Rc<NamespacedObjectContextAll<'input>> {
		Rc::new(
			BaseParserRuleContext::new_parser_ctx(parent, invoking_state,NamespacedObjectContextExt{
				namespace: None, object: None, 
				ph:PhantomData
			}),
		)
	}
}

pub trait NamespacedObjectContextAttrs<'input>: RelationTupleParserContext<'input> + BorrowMut<NamespacedObjectContextExt<'input>>{

/// Retrieves all `TerminalNode`s corresponding to token STRING in current rule
fn STRING_all(&self) -> Vec<Rc<TerminalNode<'input,RelationTupleParserContextType>>>  where Self:Sized{
	self.children_of_type()
}
/// Retrieves 'i's TerminalNode corresponding to token STRING, starting from 0.
/// Returns `None` if number of children corresponding to token STRING is less or equal than `i`.
fn STRING(&self, i: usize) -> Option<Rc<TerminalNode<'input,RelationTupleParserContextType>>> where Self:Sized{
	self.get_token(STRING, i)
}

}

impl<'input> NamespacedObjectContextAttrs<'input> for NamespacedObjectContext<'input>{}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn namespacedObject(&mut self,)
	-> Result<Rc<NamespacedObjectContextAll<'input>>,ANTLRError> {
		let mut recog = self;
		let _parentctx = recog.ctx.take();
		let mut _localctx = NamespacedObjectContextExt::new(_parentctx.clone(), recog.base.get_state());
        recog.base.enter_rule(_localctx.clone(), 2, RULE_namespacedObject);
        let mut _localctx: Rc<NamespacedObjectContextAll> = _localctx;
		let result: Result<(), ANTLRError> = (|| {

			//recog.base.enter_outer_alt(_localctx.clone(), 1);
			recog.base.enter_outer_alt(None, 1);
			{
			recog.base.set_state(17);
			let tmp = recog.base.match_token(STRING,&mut recog.err_handler)?;
			 cast_mut::<_,NamespacedObjectContext >(&mut _localctx).namespace = Some(tmp.clone());
			  

			recog.base.set_state(18);
			recog.base.match_token(T__2,&mut recog.err_handler)?;

			recog.base.set_state(19);
			let tmp = recog.base.match_token(STRING,&mut recog.err_handler)?;
			 cast_mut::<_,NamespacedObjectContext >(&mut _localctx).object = Some(tmp.clone());
			  

			}
			Ok(())
		})();
		match result {
		Ok(_)=>{},
        Err(e @ ANTLRError::FallThrough(_)) => return Err(e),
		Err(ref re) => {
				//_localctx.exception = re;
				recog.err_handler.report_error(&mut recog.base, re);
				recog.err_handler.recover(&mut recog.base, re)?;
			}
		}
		recog.base.exit_rule();

		Ok(_localctx)
	}
}
//------------------- subject ----------------
pub type SubjectContextAll<'input> = SubjectContext<'input>;


pub type SubjectContext<'input> = BaseParserRuleContext<'input,SubjectContextExt<'input>>;

#[derive(Clone)]
pub struct SubjectContextExt<'input>{
ph:PhantomData<&'input str>
}

impl<'input> RelationTupleParserContext<'input> for SubjectContext<'input>{}

impl<'input,'a> Listenable<dyn RelationTupleListener<'input> + 'a> for SubjectContext<'input>{
		fn enter(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.enter_every_rule(self);
			listener.enter_subject(self);
		}
		fn exit(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.exit_subject(self);
			listener.exit_every_rule(self);
		}
}

impl<'input,'a> Visitable<dyn RelationTupleVisitor<'input> + 'a> for SubjectContext<'input>{
	fn accept(&self,visitor: &mut (dyn RelationTupleVisitor<'input> + 'a)) {
		visitor.visit_subject(self);
	}
}

impl<'input> CustomRuleContext<'input> for SubjectContextExt<'input>{
	type TF = LocalTokenFactory<'input>;
	type Ctx = RelationTupleParserContextType;
	fn get_rule_index(&self) -> usize { RULE_subject }
	//fn type_rule_index() -> usize where Self: Sized { RULE_subject }
}
antlr_rust::tid!{SubjectContextExt<'a>}

impl<'input> SubjectContextExt<'input>{
	fn new(parent: Option<Rc<dyn RelationTupleParserContext<'input> + 'input > >, invoking_state: isize) -> Rc<SubjectContextAll<'input>> {
		Rc::new(
			BaseParserRuleContext::new_parser_ctx(parent, invoking_state,SubjectContextExt{
				ph:PhantomData
			}),
		)
	}
}

pub trait SubjectContextAttrs<'input>: RelationTupleParserContext<'input> + BorrowMut<SubjectContextExt<'input>>{

fn subjectId(&self) -> Option<Rc<SubjectIdContextAll<'input>>> where Self:Sized{
	self.child_of_type(0)
}
fn subjectSet(&self) -> Option<Rc<SubjectSetContextAll<'input>>> where Self:Sized{
	self.child_of_type(0)
}

}

impl<'input> SubjectContextAttrs<'input> for SubjectContext<'input>{}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn subject(&mut self,)
	-> Result<Rc<SubjectContextAll<'input>>,ANTLRError> {
		let mut recog = self;
		let _parentctx = recog.ctx.take();
		let mut _localctx = SubjectContextExt::new(_parentctx.clone(), recog.base.get_state());
        recog.base.enter_rule(_localctx.clone(), 4, RULE_subject);
        let mut _localctx: Rc<SubjectContextAll> = _localctx;
		let result: Result<(), ANTLRError> = (|| {

			recog.base.set_state(31);
			recog.err_handler.sync(&mut recog.base)?;
			match  recog.interpreter.adaptive_predict(0,&mut recog.base)? {
				1 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 1);
					recog.base.enter_outer_alt(None, 1);
					{
					/*InvokeRule subjectId*/
					recog.base.set_state(21);
					recog.subjectId()?;

					}
				}
			,
				2 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 2);
					recog.base.enter_outer_alt(None, 2);
					{
					/*InvokeRule subjectSet*/
					recog.base.set_state(22);
					recog.subjectSet()?;

					}
				}
			,
				3 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 3);
					recog.base.enter_outer_alt(None, 3);
					{
					recog.base.set_state(23);
					recog.base.match_token(T__3,&mut recog.err_handler)?;

					/*InvokeRule subjectId*/
					recog.base.set_state(24);
					recog.subjectId()?;

					recog.base.set_state(25);
					recog.base.match_token(T__4,&mut recog.err_handler)?;

					}
				}
			,
				4 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 4);
					recog.base.enter_outer_alt(None, 4);
					{
					recog.base.set_state(27);
					recog.base.match_token(T__3,&mut recog.err_handler)?;

					/*InvokeRule subjectSet*/
					recog.base.set_state(28);
					recog.subjectSet()?;

					recog.base.set_state(29);
					recog.base.match_token(T__4,&mut recog.err_handler)?;

					}
				}

				_ => {}
			}
			Ok(())
		})();
		match result {
		Ok(_)=>{},
        Err(e @ ANTLRError::FallThrough(_)) => return Err(e),
		Err(ref re) => {
				//_localctx.exception = re;
				recog.err_handler.report_error(&mut recog.base, re);
				recog.err_handler.recover(&mut recog.base, re)?;
			}
		}
		recog.base.exit_rule();

		Ok(_localctx)
	}
}
//------------------- subjectId ----------------
pub type SubjectIdContextAll<'input> = SubjectIdContext<'input>;


pub type SubjectIdContext<'input> = BaseParserRuleContext<'input,SubjectIdContextExt<'input>>;

#[derive(Clone)]
pub struct SubjectIdContextExt<'input>{
ph:PhantomData<&'input str>
}

impl<'input> RelationTupleParserContext<'input> for SubjectIdContext<'input>{}

impl<'input,'a> Listenable<dyn RelationTupleListener<'input> + 'a> for SubjectIdContext<'input>{
		fn enter(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.enter_every_rule(self);
			listener.enter_subjectId(self);
		}
		fn exit(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.exit_subjectId(self);
			listener.exit_every_rule(self);
		}
}

impl<'input,'a> Visitable<dyn RelationTupleVisitor<'input> + 'a> for SubjectIdContext<'input>{
	fn accept(&self,visitor: &mut (dyn RelationTupleVisitor<'input> + 'a)) {
		visitor.visit_subjectId(self);
	}
}

impl<'input> CustomRuleContext<'input> for SubjectIdContextExt<'input>{
	type TF = LocalTokenFactory<'input>;
	type Ctx = RelationTupleParserContextType;
	fn get_rule_index(&self) -> usize { RULE_subjectId }
	//fn type_rule_index() -> usize where Self: Sized { RULE_subjectId }
}
antlr_rust::tid!{SubjectIdContextExt<'a>}

impl<'input> SubjectIdContextExt<'input>{
	fn new(parent: Option<Rc<dyn RelationTupleParserContext<'input> + 'input > >, invoking_state: isize) -> Rc<SubjectIdContextAll<'input>> {
		Rc::new(
			BaseParserRuleContext::new_parser_ctx(parent, invoking_state,SubjectIdContextExt{
				ph:PhantomData
			}),
		)
	}
}

pub trait SubjectIdContextAttrs<'input>: RelationTupleParserContext<'input> + BorrowMut<SubjectIdContextExt<'input>>{

/// Retrieves first TerminalNode corresponding to token STRING
/// Returns `None` if there is no child corresponding to token STRING
fn STRING(&self) -> Option<Rc<TerminalNode<'input,RelationTupleParserContextType>>> where Self:Sized{
	self.get_token(STRING, 0)
}

}

impl<'input> SubjectIdContextAttrs<'input> for SubjectIdContext<'input>{}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn subjectId(&mut self,)
	-> Result<Rc<SubjectIdContextAll<'input>>,ANTLRError> {
		let mut recog = self;
		let _parentctx = recog.ctx.take();
		let mut _localctx = SubjectIdContextExt::new(_parentctx.clone(), recog.base.get_state());
        recog.base.enter_rule(_localctx.clone(), 6, RULE_subjectId);
        let mut _localctx: Rc<SubjectIdContextAll> = _localctx;
		let result: Result<(), ANTLRError> = (|| {

			//recog.base.enter_outer_alt(_localctx.clone(), 1);
			recog.base.enter_outer_alt(None, 1);
			{
			recog.base.set_state(33);
			recog.base.match_token(STRING,&mut recog.err_handler)?;

			}
			Ok(())
		})();
		match result {
		Ok(_)=>{},
        Err(e @ ANTLRError::FallThrough(_)) => return Err(e),
		Err(ref re) => {
				//_localctx.exception = re;
				recog.err_handler.report_error(&mut recog.base, re);
				recog.err_handler.recover(&mut recog.base, re)?;
			}
		}
		recog.base.exit_rule();

		Ok(_localctx)
	}
}
//------------------- subjectSet ----------------
pub type SubjectSetContextAll<'input> = SubjectSetContext<'input>;


pub type SubjectSetContext<'input> = BaseParserRuleContext<'input,SubjectSetContextExt<'input>>;

#[derive(Clone)]
pub struct SubjectSetContextExt<'input>{
	pub subjectNamespacedObject: Option<Rc<NamespacedObjectContextAll<'input>>>,
	pub subjectRelation: Option<TokenType<'input>>,
ph:PhantomData<&'input str>
}

impl<'input> RelationTupleParserContext<'input> for SubjectSetContext<'input>{}

impl<'input,'a> Listenable<dyn RelationTupleListener<'input> + 'a> for SubjectSetContext<'input>{
		fn enter(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.enter_every_rule(self);
			listener.enter_subjectSet(self);
		}
		fn exit(&self,listener: &mut (dyn RelationTupleListener<'input> + 'a)) {
			listener.exit_subjectSet(self);
			listener.exit_every_rule(self);
		}
}

impl<'input,'a> Visitable<dyn RelationTupleVisitor<'input> + 'a> for SubjectSetContext<'input>{
	fn accept(&self,visitor: &mut (dyn RelationTupleVisitor<'input> + 'a)) {
		visitor.visit_subjectSet(self);
	}
}

impl<'input> CustomRuleContext<'input> for SubjectSetContextExt<'input>{
	type TF = LocalTokenFactory<'input>;
	type Ctx = RelationTupleParserContextType;
	fn get_rule_index(&self) -> usize { RULE_subjectSet }
	//fn type_rule_index() -> usize where Self: Sized { RULE_subjectSet }
}
antlr_rust::tid!{SubjectSetContextExt<'a>}

impl<'input> SubjectSetContextExt<'input>{
	fn new(parent: Option<Rc<dyn RelationTupleParserContext<'input> + 'input > >, invoking_state: isize) -> Rc<SubjectSetContextAll<'input>> {
		Rc::new(
			BaseParserRuleContext::new_parser_ctx(parent, invoking_state,SubjectSetContextExt{
				subjectRelation: None, 
				subjectNamespacedObject: None, 
				ph:PhantomData
			}),
		)
	}
}

pub trait SubjectSetContextAttrs<'input>: RelationTupleParserContext<'input> + BorrowMut<SubjectSetContextExt<'input>>{

fn namespacedObject(&self) -> Option<Rc<NamespacedObjectContextAll<'input>>> where Self:Sized{
	self.child_of_type(0)
}
/// Retrieves first TerminalNode corresponding to token STRING
/// Returns `None` if there is no child corresponding to token STRING
fn STRING(&self) -> Option<Rc<TerminalNode<'input,RelationTupleParserContextType>>> where Self:Sized{
	self.get_token(STRING, 0)
}

}

impl<'input> SubjectSetContextAttrs<'input> for SubjectSetContext<'input>{}

impl<'input, I, H> RelationTupleParser<'input, I, H>
where
    I: TokenStream<'input, TF = LocalTokenFactory<'input> > + TidAble<'input>,
    H: ErrorStrategy<'input,BaseParserType<'input,I>>
{
	pub fn subjectSet(&mut self,)
	-> Result<Rc<SubjectSetContextAll<'input>>,ANTLRError> {
		let mut recog = self;
		let _parentctx = recog.ctx.take();
		let mut _localctx = SubjectSetContextExt::new(_parentctx.clone(), recog.base.get_state());
        recog.base.enter_rule(_localctx.clone(), 8, RULE_subjectSet);
        let mut _localctx: Rc<SubjectSetContextAll> = _localctx;
		let mut _la: isize = -1;
		let result: Result<(), ANTLRError> = (|| {

			recog.base.set_state(41);
			recog.err_handler.sync(&mut recog.base)?;
			match  recog.interpreter.adaptive_predict(2,&mut recog.base)? {
				1 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 1);
					recog.base.enter_outer_alt(None, 1);
					{
					/*InvokeRule namespacedObject*/
					recog.base.set_state(35);
					let tmp = recog.namespacedObject()?;
					 cast_mut::<_,SubjectSetContext >(&mut _localctx).subjectNamespacedObject = Some(tmp.clone());
					  

					recog.base.set_state(36);
					recog.base.match_token(T__0,&mut recog.err_handler)?;

					recog.base.set_state(38);
					recog.err_handler.sync(&mut recog.base)?;
					_la = recog.base.input.la(1);
					if _la==STRING {
						{
						recog.base.set_state(37);
						let tmp = recog.base.match_token(STRING,&mut recog.err_handler)?;
						 cast_mut::<_,SubjectSetContext >(&mut _localctx).subjectRelation = Some(tmp.clone());
						  

						}
					}

					}
				}
			,
				2 =>{
					//recog.base.enter_outer_alt(_localctx.clone(), 2);
					recog.base.enter_outer_alt(None, 2);
					{
					/*InvokeRule namespacedObject*/
					recog.base.set_state(40);
					let tmp = recog.namespacedObject()?;
					 cast_mut::<_,SubjectSetContext >(&mut _localctx).subjectNamespacedObject = Some(tmp.clone());
					  

					}
				}

				_ => {}
			}
			Ok(())
		})();
		match result {
		Ok(_)=>{},
        Err(e @ ANTLRError::FallThrough(_)) => return Err(e),
		Err(ref re) => {
				//_localctx.exception = re;
				recog.err_handler.report_error(&mut recog.base, re);
				recog.err_handler.recover(&mut recog.base, re)?;
			}
		}
		recog.base.exit_rule();

		Ok(_localctx)
	}
}

lazy_static! {
    static ref _ATN: Arc<ATN> =
        Arc::new(ATNDeserializer::new(None).deserialize(_serializedATN.chars()));
    static ref _decision_to_DFA: Arc<Vec<antlr_rust::RwLock<DFA>>> = {
        let mut dfa = Vec::new();
        let size = _ATN.decision_to_state.len();
        for i in 0..size {
            dfa.push(DFA::new(
                _ATN.clone(),
                _ATN.get_decision_state(i),
                i as isize,
            ).into())
        }
        Arc::new(dfa)
    };
}



const _serializedATN:&'static str =
	"\x03\u{608b}\u{a72a}\u{8133}\u{b9ed}\u{417c}\u{3be7}\u{7786}\u{5964}\x03\
	\x09\x2e\x04\x02\x09\x02\x04\x03\x09\x03\x04\x04\x09\x04\x04\x05\x09\x05\
	\x04\x06\x09\x06\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\
	\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\
	\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\x22\x0a\x04\x03\x05\x03\
	\x05\x03\x06\x03\x06\x03\x06\x05\x06\x29\x0a\x06\x03\x06\x05\x06\x2c\x0a\
	\x06\x03\x06\x02\x02\x07\x02\x04\x06\x08\x0a\x02\x02\x02\x2d\x02\x0c\x03\
	\x02\x02\x02\x04\x13\x03\x02\x02\x02\x06\x21\x03\x02\x02\x02\x08\x23\x03\
	\x02\x02\x02\x0a\x2b\x03\x02\x02\x02\x0c\x0d\x05\x04\x03\x02\x0d\x0e\x07\
	\x03\x02\x02\x0e\x0f\x07\x08\x02\x02\x0f\x10\x07\x04\x02\x02\x10\x11\x05\
	\x06\x04\x02\x11\x12\x07\x02\x02\x03\x12\x03\x03\x02\x02\x02\x13\x14\x07\
	\x08\x02\x02\x14\x15\x07\x05\x02\x02\x15\x16\x07\x08\x02\x02\x16\x05\x03\
	\x02\x02\x02\x17\x22\x05\x08\x05\x02\x18\x22\x05\x0a\x06\x02\x19\x1a\x07\
	\x06\x02\x02\x1a\x1b\x05\x08\x05\x02\x1b\x1c\x07\x07\x02\x02\x1c\x22\x03\
	\x02\x02\x02\x1d\x1e\x07\x06\x02\x02\x1e\x1f\x05\x0a\x06\x02\x1f\x20\x07\
	\x07\x02\x02\x20\x22\x03\x02\x02\x02\x21\x17\x03\x02\x02\x02\x21\x18\x03\
	\x02\x02\x02\x21\x19\x03\x02\x02\x02\x21\x1d\x03\x02\x02\x02\x22\x07\x03\
	\x02\x02\x02\x23\x24\x07\x08\x02\x02\x24\x09\x03\x02\x02\x02\x25\x26\x05\
	\x04\x03\x02\x26\x28\x07\x03\x02\x02\x27\x29\x07\x08\x02\x02\x28\x27\x03\
	\x02\x02\x02\x28\x29\x03\x02\x02\x02\x29\x2c\x03\x02\x02\x02\x2a\x2c\x05\
	\x04\x03\x02\x2b\x25\x03\x02\x02\x02\x2b\x2a\x03\x02\x02\x02\x2c\x0b\x03\
	\x02\x02\x02\x05\x21\x28\x2b";

