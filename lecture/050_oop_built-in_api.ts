/** コンストラクタから動的に初期化する */
class Person {
  name: string;

  constructor(personName: string) {
    this.name = personName;
  }
}
const alice = new Person('Alice');

/** 初期化子を用いて初期化する */
class Point {
  x: number = 0; // 初期化
  y: number = 0; // 初期化
}
const point = new Point();
console.log(point.x, point.y);

/** クラスはオブジェクトだがtypescriptでは拡張不可 */
const myObject = {};
// myObject.key = 'value'; // コンパイルエラーになるが実行エラーにならない

/** TSのクラスではstatic(インスタンスごとではなくクラスのプロパティ)が使用可能 */
class SomeClass {
  private static field: number;
  static doSomething() {}
}
SomeClass.doSomething();

/** インターフェース */
interface SomeInterface {
  field: string;
  method1(): void;
  method2(arg: string): void;
}

/** インターフェースのクラス実装: implements */
interface Human {
  think(): void;
}

interface Programmer {
  writeCode(): void;
}

class TypeScriptProgrammer implements Human, Programmer {
  think(): void {
    console.log('どういうコードにしようかな〜');
  }

  writeCode(): void {
    console.log('カタカタ');
  }
}

/** インターフェースの継承: extends */
interface Teacher extends Person {
  students: Person[]; // 生徒
}

/** インターフェースの実装判定には型ガード関数が必要 -> 面倒な場合はzodライブラリ */

/**
 * JSXのベストプラクティス
 * - 真偽値属性のtrueは省略する
 * - 自己終了タグを使用する
 */

/** Dateのベストプラクティス
 * - 2/30が3/1に自動変換されるなどの非直感的な操作、フォーマットの手間などを鑑みてライブラリを使用する
 * - date-fnsかDay.js
 */

/** 正規表現 */
const regexp1 = /0(8|9)0-[0-9]{4}-[0-9]{4}/g; // /で囲む+フラグ
const regexp2 = new RegExp('0(8|9)0-[0-9]{4}-[0-9]{4}', 'g'); //　静的な場合は非推奨
