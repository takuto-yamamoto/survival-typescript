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
