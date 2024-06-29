export type Nullish = null | undefined;

export function isNullish(value: unknown): value is Nullish {
  return value === null || value === undefined;
}

export function isNotNullish<T>(value: T): value is NonNullable<T> {
  return !isNullish(value);
}
