import { isPromiseLike } from "./isPromiseLike";

export class FailedAttempt {
  constructor(public readonly failure: unknown) {}
}

export function attemptSync<T>(f: () => T) {
  try {
    return f();
  } catch (error) {
    return new FailedAttempt(error);
  }
}

export async function attemptAsync<T>(f: () => T | PromiseLike<T>) {
  try {
    return await f();
  } catch (error) {
    return new FailedAttempt(error);
  }
}

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
