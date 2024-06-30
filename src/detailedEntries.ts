export type DetailedEntry<T> =
  | {
      [K in keyof T]: K extends string | number ? [`${K}`, T[K]] : never;
    }[keyof T]
  | [string, unknown];

export type DetailedEntries<T> = DetailedEntry<T>[];

export function detailedEntries<T extends NonNullable<unknown>>(obj: T) {
  return Object.entries(obj) as DetailedEntries<T>;
}
