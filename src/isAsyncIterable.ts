export function isAsyncIterable(
  value: unknown
): value is AsyncIterable<unknown> {
  return (
    typeof (value as AsyncIterable<unknown>)?.[Symbol.asyncIterator] ===
    "function"
  );
}
