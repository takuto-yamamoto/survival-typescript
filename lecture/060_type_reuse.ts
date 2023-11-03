/** keyof演算子 */
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;
// 上は次と同じ意味になる
// type BookKey = "title" | "price" | "rating";

/**
 * ユーティリティ
 * - Required<T>, Partial<T>
 * - Readonly<T>
 * - Record<Keys, Type>
 * - Pick<T, Keys>
 * - Omit<T, Keys>
 * - Exclude<T, U>
 * - Extrack<T, U>
 */

/** Pick<T, Keys> */
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
// Pick定義しておくことでUserの定義変更を自動で追従してくれる
type SimpleUser = Pick<User, 'surname' | 'middleName' | 'givenName'>;
// 同じ意味
type SimpleUser2 = {
  surname: string;
  middleName?: string;
  givenName: string;
};

/** OmitはTに含まれないKeysは無視するので、Keysにtypoがあってもエラーにならないので注意 */

/**
 * Exclude<T, Keys>
 * - 問題点1: Tの候補が追加/変更されたときにExclude後の型にも自動で追加される
 * - 問題点2: Tに含まれないKeysは無視する
 */
type PullRequestState = 'draft' | 'reviewed' | 'rejected'; // Tはユニオン
type MergeableState = Exclude<PullRequestState, 'draft' | 'rejected'>;

/** Exclude<T, U>: T(ユニオン型)とU(ユニオン型)の重複部分を取り出す */
type CommonTypes = Extract<'a' | 'b' | 'c', 'b' | 'c' | 'd'>; // b | c

/** Mapped Types */
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
type Butterfly = {
  [key in SystemSupportLanguage]: string; // 'en' | 'fr' | 'it' | 'es'を持つtypeとなる
  // name: string // 追加の属性は書けない
} & { name: string }; // インターセクションすれば追加属性書ける

/** indexed type */
type Persona = { name: string; age: number };
type T = Persona['name' | 'age']; // string | number

// keyofと合わせるとオブジェクトの全タイプのユニオンが得られる
type Foo = { a: number; b: string; c: boolean };
type T2 = Foo[keyof Foo];

// 配列にはnumberでアクセス
type StringArray = string[];
type T3 = StringArray[number]; // string

// typeof で配列の型を取得可能
const array = [null, 'a', 'b'];
type T4 = (typeof array)[number]; // string | null
