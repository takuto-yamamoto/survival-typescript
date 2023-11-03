/**
 * catchされるerrorはデフォルトでany型になる
 * - useUnknownInCatchVariablesを有効にするとunknownとなりより正確になる
 */

/** catch節は複数書けないのでinstanceOfによる条件分岐で対応する */
try {
  // ...
} catch (e) {
  if (e instanceof TypeError) {
    // TypeErrorに対する処理
  } else if (e instanceof RangeError) {
    // RangeErrorに対する処理
  } else if (e instanceof EvalError) {
    // EvalErrorに対する処理
  } else {
    // その他のエラー
  }
}

/** never型 */
// なにも代入できない
// const neverFoo: never = 1; //コンパイルエラー
// 何にでも代入できる
const a: string = 1 as never; // エラーにならない
// 例外を投げるor永遠に実行される関数の戻り値はnever型
function throwError(): never {
  throw new Error();
}
type NumberString = string & number; // never型

/** neverを使った網羅性チェック */
/** 網羅性チェック用の例外クラス */
class ExhaustiveError extends Error {
  constructor(value: never, message = `unsupported type: ${value}`) {
    super(message);
  }
}
// ユニオン型の網羅性チェック
type Extension = 'js' | 'ts' | 'json';
function printLang(ext: Extension): void {
  switch (ext) {
    case 'js':
      console.log('JavaScript');
      break;
    case 'ts':
      console.log('TypeScript');
      break;
    case 'json':
      console.log('TypeScript');
      break;
    default:
      // 網羅されていればエラーにならない
      // const exhaustivenessCheck: never = ext;
      // break;
      // エラークラス実装
      throw new ExhaustiveError(ext);
  }
}

/** ユニオン型の制御構文 */
// 制御構文
function showMonth(month: string | number) {
  // typeof演算子でstringであることを明示する
  if (typeof month === 'string') {
    console.log(month.padStart(2, '0'));
    return;
  }
  console.log(month.toFixed()); // stringであることがreturnにより明示される
}

/**
 * 型ガード
 * - typeof: 型を判定する
 * - instanceof: 特定のクラスのインスタンスであるかどうかを判定する
 * - {prop} in {obj}: objにprop（string）が存在するかどうかを判定する
 *  */

/** 型ガード関数 */
// {argName} is {Type}: 型ガード関数のシグネチャ
function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/** unknownは型安全なany型（anyはとりあえずOK、unknownはとりあえずダメ） */
const unknownValue: unknown = 10;
// const int: number = unknownValue; // error(anyではerrorにならない)

/** unknownの使用方法：validationしたいときとか（あんま使わなそう） */
const unknownValue2: unknown = '';
// 型ガード
if (typeof unknownValue2 === 'string') {
  // ここブロックではvalueはstring型として扱える
  console.log(unknownValue2.toUpperCase());
}
