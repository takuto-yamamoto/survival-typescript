/** 型定義 */
const num: number = 123;

/** 型推論 */
let x = 1;
// x = '' // Type 'string' is not assignable to type 'number'.

/** nullのtypeof */
typeof null; // undefined

/** Symbol型(使わなくてOK) */
const s1: symbol = Symbol('foo');
const s2: symbol = Symbol('foo');
console.log(s1 == s2); // false

/** bigint型 */
const bigNum: bigint = 100n; // nをつける

/**
 * プリミティブ型(=プロパティやメソッドを持たないはず)のauto-boxing
 * - number: Number
 * - boolean: Boolean
 * - bigint: BigInt
 * - string: String
 * - symbol: Symbol
 * - null/undefined: ラッパー無し
 */
const str: string = 'hello';
console.log(str.length); // ちゃんと動く

/** 型注釈にラッパー型は使用しない(使用するメリット無し) */
const n1: Number = 1;
// const n2: number = n1; // プリミティブ型への再代入不可
// console.log(n1 + 2); // 演算子使用不可

/** リテラル型 */
let literalNum: 1 = 1; // 1だけ代入可能
// literalNum = 100; // エラー

/** リテラル型として使用可能なのはboolean/string/numberのみ */
const multiTypePrimitive: true | 123 | 'str' = 'str'; // ユニオン型と組み合わせがち

/** any型はなんでもOK */
let anyValue: any;
anyValue = 'string';
anyValue = 1; // エラーにならない

/** any型はコンパイラが静的チェックを行わない */
// anyValue.toLowerCase(); // コンパイルエラーにはならず実行エラー

/** 暗黙のany: 引数の型注釈を省略した場合など */
// name: any に等価
function hello(name) {
  console.log(`Hello, ${name.toUpperCase()}`);
}
// hello(1); // コンパイルエラーにはならず実行エラー

/**
 * anyは悪か？
 * - 型チェックを放棄するため、バグが起こりやすくなる
 * - 品質よりもスピード重視の場合や、JSコードの移行の場合などはいったんanyでも良いかも
 * - 頑張らないtypescript
 *
 * Tips: tsconfig.jsonのnotImplicitAny: trueで暗黙のanyをコンパイルエラーにできる
 */
