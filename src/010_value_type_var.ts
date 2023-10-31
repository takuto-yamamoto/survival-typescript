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

/** enum: 列挙型 */
enum Position {
  Top,
  Bottom,
  Right,
  Left,
}
//// 以下が行われているのでPosition.Top=0だしPosition[0]='Top'（逆引きのサポート）
// var Position;
// (function (Position) {
//   Position[(Position['Top'] = 0)] = 'Top';
//   Position[(Position['Bottom'] = 1)] = 'Bottom';
//   Position[(Position['Right'] = 2)] = 'Right';
//   Position[(Position['Left'] = 3)] = 'Left';
// } (Position || (Position = {})));

/** 初期値は0からの連番だが、数字を入れると以降はそこからの連番 */
enum Position2 {
  Top, // 0
  Bottom, // 1
  Right, // 2
  Left, // 3
}
enum Position3 {
  Top = 1,
  Bottom, // 2
  Right, // 3
  Left, // 4
}

/** 文字列も代入可能 */
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

/** 使いどころ: グローバル定数とか */
enum Constants {
  API_URL = 'https://api.example.com',
  MAX_RETRIES = 3,
  TIMEOUT = 5000,
}

/**
 * 課題
 * - 数値型enumの型安全性：数値ならなんでも代入できてしまう（TS5.0未満）
 * - 数値型enumでは存在しない値でアクセスしてもコンパイルエラーにならない
 * - 文字列だけ公称型
 *
 * ベストプラクティス：以下の要件がない時はオブジェクトリテラルかユニオンで書く
 * - 値から数値の逆引きも欲しい時
 */
// as constで再帰的にReadOnlyとする
const Flag = {
  None: 0,
  Read: 1 << 0,
  Write: 1 << 1,
  Execute: 1 << 2,
} as const;
// Flagのtype相当のオブジェクトから、キーに対する値をユニオンで取得する
type Flag = (typeof Flag)[keyof typeof Flag]; // 0 | 1 | 2 | 4

/** ユニオン型と絞り込み */
const maybeUserId: string | null = localStorage.getItem('userId');
// // nullかもしれないので、代入できない。
// const userId: string = maybeUserId;
// // 代入するにはユニオン型を絞り込む
if (typeof maybeUserId === 'string') {
  const userId: string = maybeUserId;
}

/**
 * 判別可能なユニオン型
 * - オブジェクトの型で構成されたユニオン型を持つとき、絞り込みの分岐ロジックが複雑になる場合に使用
 * - 判別可能な（ユニークな値をもつ）キーを設定する
 */
type UploadStatus = InProgress | Success | Failure;
type InProgress = { type: 'InProgress'; progress: number };
type Success = { type: 'Success' };
type Failure = { type: 'Failure'; error: Error };

function printStatus(status: UploadStatus) {
  switch (status.type) {
    case 'InProgress':
      console.log(`アップロード中:${status.progress}%`);
      break;
    case 'Success':
      console.log('アップロード成功', status);
      break;
    case 'Failure':
      console.log(`アップロード失敗:${status.error.message}`);
      break;
    default:
      console.log('不正なステータス: ', status);
  }
}

/** インターセクション型で型をがっちゃんこする（ユニオンORのAND版） */
// 全プロパティを必須とするRequiredユーティリティ
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;
// 全プロパティを任意とするPartialユーティリティ
type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
// これをがっちゃんこすることで型の可読性向上
type Parameter = Mandatory & Optional;

/** 型アサーション（基本的に避ける） */
const value: string | number = 'this is a string';
const strLength: number = (value as string).length; // ここのvalueはstringとしてコンパイルして！信じて！

/** constアサーションでオブジェクトプロパティを再帰的にreadonlyにする */
const pikachu = {
  name: 'pikachu',
  no: 25,
  genre: 'mouse pokémon',
  height: 0.4,
  weight: 6.0,
} as const;

/**
 * 割り当て済みassertion（基本的に使用しない）
 * - let num!: number; // 以降undefinedかどうかは気にしないで！
 * - console.log(num! * 2) // undefinedじゃないから気にしないで！
 */

/** nullやarrayはobject型なのでtypeof演算子注意、!== nullやArray.isArray()を使う */
