export function isIterable(value: unknown): value is Iterable<unknown> {
  return typeof (value as Iterable<unknown>)?.[Symbol.iterator] === "function";
}
