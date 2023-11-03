/** 関数の型注釈 */
function increment(num: number): number {
  return num++;
}

// 未指定は暗黙にanyだが、noImplicitAny: trueで型指定を必須にできる
function increment2(num): number {
  return num++; // num: any
}

/** 関数型の定義は型エイリアスを使用 */
type SomeFuncType1 = (arg: string) => any;
type SomeFuncType2 = { (arg: string): any };
const someFunc: SomeFuncType2 = (arg) => 1;

/** 関数から型定義することも可能 */
type Increment = typeof increment;

/** 戻り値のない関数にはvoidを使用 */

/**
 * JavaScriptは値渡し
 * - 例外としてオブジェクトの再代入は参照渡し
 */

/** typescriptでは?:でオプション引数を定義可能 */
function hello(person?: string) {
  console.log('hello', person); // string | undefined
}

// undefinedではない前提で操作をしたい場合はデフォルト値を持たせる（引数の順番は気にしなくてOK）
function hello2(person: string = 'anonymous') {
  console.log('hello', person); // string
  console.log(person.toLowerCase()); // デフォルト値により動作可能
}
hello2();

/** オブジェクト引数のデフォルト値型定義には?:を使用する */
function func({ x, y = 1, z = 2 }: { x: number; y?: number; z?: number }) {
  console.log(x, y, z);
}
