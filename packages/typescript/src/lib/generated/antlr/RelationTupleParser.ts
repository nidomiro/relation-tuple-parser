// Generated from RelationTuple.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { RelationTupleVisitor } from "./RelationTupleVisitor";


export class RelationTupleParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly STRING = 6;
	public static readonly CHAR = 7;
	public static readonly RULE_relationTuple = 0;
	public static readonly RULE_namespacedObject = 1;
	public static readonly RULE_subject = 2;
	public static readonly RULE_subjectId = 3;
	public static readonly RULE_subjectSet = 4;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"relationTuple", "namespacedObject", "subject", "subjectId", "subjectSet",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'#'", "'@'", "':'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "STRING", 
		"CHAR",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RelationTupleParser._LITERAL_NAMES, RelationTupleParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RelationTupleParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "RelationTuple.g4"; }

	// @Override
	public get ruleNames(): string[] { return RelationTupleParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return RelationTupleParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RelationTupleParser._ATN, this);
	}
	// @RuleVersion(0)
	public relationTuple(): RelationTupleContext {
		let _localctx: RelationTupleContext = new RelationTupleContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RelationTupleParser.RULE_relationTuple);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 10;
			this.namespacedObject();
			this.state = 11;
			this.match(RelationTupleParser.T__0);
			this.state = 12;
			_localctx._relation = this.match(RelationTupleParser.STRING);
			this.state = 13;
			this.match(RelationTupleParser.T__1);
			this.state = 14;
			this.subject();
			this.state = 15;
			this.match(RelationTupleParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public namespacedObject(): NamespacedObjectContext {
		let _localctx: NamespacedObjectContext = new NamespacedObjectContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, RelationTupleParser.RULE_namespacedObject);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 17;
			_localctx._namespace = this.match(RelationTupleParser.STRING);
			this.state = 18;
			this.match(RelationTupleParser.T__2);
			this.state = 19;
			_localctx._object = this.match(RelationTupleParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subject(): SubjectContext {
		let _localctx: SubjectContext = new SubjectContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RelationTupleParser.RULE_subject);
		try {
			this.state = 31;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 21;
				this.subjectId();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 22;
				this.subjectSet();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 23;
				this.match(RelationTupleParser.T__3);
				this.state = 24;
				this.subjectId();
				this.state = 25;
				this.match(RelationTupleParser.T__4);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 27;
				this.match(RelationTupleParser.T__3);
				this.state = 28;
				this.subjectSet();
				this.state = 29;
				this.match(RelationTupleParser.T__4);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subjectId(): SubjectIdContext {
		let _localctx: SubjectIdContext = new SubjectIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RelationTupleParser.RULE_subjectId);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 33;
			this.match(RelationTupleParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subjectSet(): SubjectSetContext {
		let _localctx: SubjectSetContext = new SubjectSetContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RelationTupleParser.RULE_subjectSet);
		try {
			this.state = 40;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 35;
				this.namespacedObject();
				this.state = 36;
				this.match(RelationTupleParser.T__0);
				this.state = 37;
				_localctx._subjectRelation = this.match(RelationTupleParser.STRING);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 39;
				this.namespacedObject();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\t-\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x05\x04\"\n\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06+\n\x06\x03\x06\x02\x02\x02\x07\x02\x02\x04\x02\x06" +
		"\x02\b\x02\n\x02\x02\x02\x02+\x02\f\x03\x02\x02\x02\x04\x13\x03\x02\x02" +
		"\x02\x06!\x03\x02\x02\x02\b#\x03\x02\x02\x02\n*\x03\x02\x02\x02\f\r\x05" +
		"\x04\x03\x02\r\x0E\x07\x03\x02\x02\x0E\x0F\x07\b\x02\x02\x0F\x10\x07\x04" +
		"\x02\x02\x10\x11\x05\x06\x04\x02\x11\x12\x07\x02\x02\x03\x12\x03\x03\x02" +
		"\x02\x02\x13\x14\x07\b\x02\x02\x14\x15\x07\x05\x02\x02\x15\x16\x07\b\x02" +
		"\x02\x16\x05\x03\x02\x02\x02\x17\"\x05\b\x05\x02\x18\"\x05\n\x06\x02\x19" +
		"\x1A\x07\x06\x02\x02\x1A\x1B\x05\b\x05\x02\x1B\x1C\x07\x07\x02\x02\x1C" +
		"\"\x03\x02\x02\x02\x1D\x1E\x07\x06\x02\x02\x1E\x1F\x05\n\x06\x02\x1F " +
		"\x07\x07\x02\x02 \"\x03\x02\x02\x02!\x17\x03\x02\x02\x02!\x18\x03\x02" +
		"\x02\x02!\x19\x03\x02\x02\x02!\x1D\x03\x02\x02\x02\"\x07\x03\x02\x02\x02" +
		"#$\x07\b\x02\x02$\t\x03\x02\x02\x02%&\x05\x04\x03\x02&\'\x07\x03\x02\x02" +
		"\'(\x07\b\x02\x02(+\x03\x02\x02\x02)+\x05\x04\x03\x02*%\x03\x02\x02\x02" +
		"*)\x03\x02\x02\x02+\v\x03\x02\x02\x02\x04!*";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RelationTupleParser.__ATN) {
			RelationTupleParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RelationTupleParser._serializedATN));
		}

		return RelationTupleParser.__ATN;
	}

}

export class RelationTupleContext extends ParserRuleContext {
	public _relation!: Token;
	public namespacedObject(): NamespacedObjectContext {
		return this.getRuleContext(0, NamespacedObjectContext);
	}
	public subject(): SubjectContext {
		return this.getRuleContext(0, SubjectContext);
	}
	public EOF(): TerminalNode { return this.getToken(RelationTupleParser.EOF, 0); }
	public STRING(): TerminalNode { return this.getToken(RelationTupleParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RelationTupleParser.RULE_relationTuple; }
	// @Override
	public accept<Result>(visitor: RelationTupleVisitor<Result>): Result {
		if (visitor.visitRelationTuple) {
			return visitor.visitRelationTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NamespacedObjectContext extends ParserRuleContext {
	public _namespace!: Token;
	public _object!: Token;
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RelationTupleParser.STRING);
		} else {
			return this.getToken(RelationTupleParser.STRING, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RelationTupleParser.RULE_namespacedObject; }
	// @Override
	public accept<Result>(visitor: RelationTupleVisitor<Result>): Result {
		if (visitor.visitNamespacedObject) {
			return visitor.visitNamespacedObject(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubjectContext extends ParserRuleContext {
	public subjectId(): SubjectIdContext | undefined {
		return this.tryGetRuleContext(0, SubjectIdContext);
	}
	public subjectSet(): SubjectSetContext | undefined {
		return this.tryGetRuleContext(0, SubjectSetContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RelationTupleParser.RULE_subject; }
	// @Override
	public accept<Result>(visitor: RelationTupleVisitor<Result>): Result {
		if (visitor.visitSubject) {
			return visitor.visitSubject(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubjectIdContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(RelationTupleParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RelationTupleParser.RULE_subjectId; }
	// @Override
	public accept<Result>(visitor: RelationTupleVisitor<Result>): Result {
		if (visitor.visitSubjectId) {
			return visitor.visitSubjectId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubjectSetContext extends ParserRuleContext {
	public _subjectRelation!: Token;
	public namespacedObject(): NamespacedObjectContext {
		return this.getRuleContext(0, NamespacedObjectContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RelationTupleParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RelationTupleParser.RULE_subjectSet; }
	// @Override
	public accept<Result>(visitor: RelationTupleVisitor<Result>): Result {
		if (visitor.visitSubjectSet) {
			return visitor.visitSubjectSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


