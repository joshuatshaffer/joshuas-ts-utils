import { Simplify } from "./Simplify";
import { UnionToIntersection } from "./UnionToIntersection";

export type DetailedFromEntries<T> = Simplify<
  UnionToIntersection<
    T extends [infer K extends PropertyKey, infer V]
      ? [string, unknown] extends [K, V]
        ? never
        : {
            [P in K]: V;
          }
      : never
  >
>;

export function detailedFromEntries<T extends readonly [PropertyKey, unknown]>(
  entries: Iterable<T>
) {
  return Object.fromEntries(entries) as DetailedFromEntries<T>;
}
