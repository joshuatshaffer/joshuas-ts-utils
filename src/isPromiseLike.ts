export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof value?.["then"] === "function";
}
