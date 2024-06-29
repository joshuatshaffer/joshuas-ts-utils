import type { IndexableUnknown } from "./IndexableUnknown";

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof (value as IndexableUnknown)?.then === "function";
}
