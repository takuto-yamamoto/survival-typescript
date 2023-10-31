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

/** オブジェクトの型注釈 */
let annotatedBox: { width: number; height: number }; // プロパティ区切りはセミコロン
annotatedBox = { width: 1000, height: 720 };
type TypedBox = { width: number; height: number };
let typedBox: TypedBox = { width: 1080, height: 720 }; // 型エイリアスでもOK

/** オブジェクトメソッドの型注釈 */
let annotatedCalclator: { sum(x: number, y: number): number }; // sumメソッドを持つ
let annotatedCalclator2: { sum: (x: number, y: number) => number }; // 関数構文の書き方でもOK

/** オブジェクトメソッドの引数型注釈は必要（他は型推論が可能なので必須ではない） */
let annotatedCalclator3 = {
  sum(x: number, y: number) {
    return x + y;
  },
};

/** 連想配列のようなKVのオブジェクト型を定義する場合はRecord<Keys, Type> */
let recordObj: Record<string, number>; // object型はNG
recordObj = { a: 1, b: 2 };

/** readonlyプロパティ: TSのみの昨日なのでコンパイルエラーにはなるが実行エラーにはならない */
const readonlyObj: {
  readonly readonlyFoo: number;
  readonly readonlyBar: Record<string, number>;
} = { readonlyFoo: 1, readonlyBar: { bar: 10 } };

readonlyObj.readonlyBar.bar = 15; // エラーにならない

/** ReadOnlyユーティリティ */
const readonlyAllObj: Readonly<{ num1: number; num2: number }> = {
  num1: 1, // readonly
  num2: 2, // readonly
};

/** オプショナルプロパティ */
let size: { width?: number };
size = {}; // エラーにならない
size = { width: undefined }; // エラーにならない
// size = { width: null }; // エラー

/** オブジェクトリテラルの余剰プロパティチェック */
let onlyX: { x: number };
onlyX = { x: 1 }; // OK
// onlyX = { x: 1, y: 2 }; // Compiile Error

/** インデックス型=Recordユーティリティと同じ */
let indexedObj: {
  [K: string]: number; // KやKeyとするのが一般的、フィールドはstring|number|symbol
};

/** javascriptはプロトタイプベースのOOP */
const sampleCounter = {
  count: 0,
  countUp() {
    this.count++;
  },
};
const ressetableCounter = Object.create(sampleCounter); // prototype chainを継承

/** オプショナルチェーン */
const bookName = 'サバイバルTypeScript';
const ichimojime: string | undefined = bookName?.[0]; // ユニオン型
const hyakumojime = bookName?.[100]; // undefined
const defaultMoji = bookName?.[1000] ?? 'デフォルト';

/** for-in文ではhasOwnPropertyを使用する */
const forInFoo = { a: 1, b: 2, c: 3 };
for (const prop in forInFoo) {
  // Object.prototype.hi = 'Hi!';
  // console.log(prop, forInFoo[prop]);
  // a: 1
  // b: 2
  // c: 3
  // hi: 'Hi!
}

const forInFoo2 = { a: 1, b: 2, c: 3 };
// Object.prototype.hi = 'Hi!';
for (const prop in forInFoo2) {
  if (Object.prototype.hasOwnProperty.call(forInFoo2, prop)) {
    console.log(prop, forInFoo[prop]);
    // a: 1
    // b: 2
    // c: 3
  }
}

/** 配列の型注釈はどちらでもOK */
let annotatedArray: number[];
let annotatedArray2: Array<number>;

/** 配列の要素に安全にアクセスする: noUncheckedIndexedAccess */
const abc: string[] = ['a', 'b', 'c'];
const character: string | undefined = abc[0]; // stringとundefinedのユニオン
if (typeof character === 'string') {
  character.toLowerCase(); // if分岐しないとコンパイルエラー
}

/** 読み取り専用配列 */
const readonlyNums: readonly number[] = [1, 2, 3];
// readonlyNums.push(4); // コンパイルエラーだけど実行エラーにはならない

/** 型アサーションによる読み取り専用配列の再代入 */
const readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
const writableNumbers: number[] = readonlyNumbers as number[];

/**
 * 配列の破壊的なメソッド
 * - pop/push
 * - shift/unshift
 * - splice
 * - sort
 * - reverse: 注意
 * - fill
 * - copyWithin
 */
// 破壊的操作の前にはコピーを挟むことで安全に破壊できる（不変性）
const original = [1, 2, 3];
const reversed = [...original].reverse();

/** タプルの型定義 */
const tuple: [string, number, boolean] = ['ok', 1, true];
// tuple[5] // コンパイルエラー
tuple[0].toLowerCase();
// tuple[1].toLowerCase(); // コンパイルエラー
const [, , onlyBoolNeeded] = tuple;

/** tupleの使用シーン */
async function takes3Seconds(): Promise<string> {
  await window.setTimeout(() => {}, 3000);
  return 'finished';
}
async function takes5Seconds(): Promise<number> {
  await window.setTimeout(() => {}, 5000);
  return -1;
}
//// 8秒かかる
// async () => {
//   const str: string = await takes3Seconds();
//   const num: number = await takes5Seconds();
// };
//// 5秒で済む
// async () => {
//   const multiTuple: [string, number] = await Promise.all([
//     takes3Seconds(),
//     takes5Seconds(),
//   ]);
// };
