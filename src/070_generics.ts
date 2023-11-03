/** ジェネリクスの記法 */
// 型を変数T化し、関数の汎用性を高める
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<string>('勝ち', '負け'); // string
chooseRandomly<number>(1, 2); // number
// chooseRandomly<URL>(urlA, urlB); // URL

/** ジェネリクスが使用されている標準ライブラリ */
const textNumbers: Array<string> = ['1', '2', '3', '4']; // Array<T>
const numbers = textNumbers.map<number>(function (text: string) {
  return Number(text);
}); // Array.prototype.map<T>

type Address = {
  country: string;
  postalCode: string;
  address1: string;
};

const addresses = new Map<string, Address>(); // Map<K, V>
addresses.set('太郎', {
  country: '日本',
  postalCode: '8256405',
  address1: '東京都',
});

/** 型変数にはT -> U -> V...もしくはK, Vのように意味のある文字 */

/** extendsで型変数に制約をつける（特定のクラスのみ型変数に代入可能とする） */
function changeBackgroundColor<T extends HTMLElement>(element: T) {
  element.style.backgroundColor = 'red';
  return element;
}

/** 初期値を入れられる */
type MyErrorEvent<T extends Error = SyntaxError> = {
  error: T;
  type: string;
};
