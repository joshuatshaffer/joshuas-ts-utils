import { isPromiseLike } from "../isPromiseLike";
import { FailedAttempt } from "./FailedAttempt";

export type AttemptResult<T> =
  | (T extends PromiseLike<infer U> ? PromiseLike<U | FailedAttempt> : T)
  | FailedAttempt;

export function attempt<T>(f: () => T): AttemptResult<T> {
  try {
    const result = f();

    if (isPromiseLike(result)) {
      return result.then(
        (x) => x,
        (error) => new FailedAttempt(error)
      ) as AttemptResult<T>;
    }

    return result as AttemptResult<T>;
  } catch (error) {
    return new FailedAttempt(error);
  }
}
