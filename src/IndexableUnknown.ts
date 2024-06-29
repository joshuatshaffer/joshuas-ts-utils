/**
 * Theoretically, this type should be equivalent to `unknown`, but TypeScript
 * does not allow using the optional chaining operator with `unknown`.
 *
 * `value?.[key]` should be `readonly unknown` when property `key` does not
 * exist on `typeof value`. However, TypeScript gives a compile error. `(value
 * as IndexableUnknown)?.[key]` produces the expected result.
 */
export type IndexableUnknown =
  | null
  | undefined
  | { readonly [P in PropertyKey]?: unknown };
