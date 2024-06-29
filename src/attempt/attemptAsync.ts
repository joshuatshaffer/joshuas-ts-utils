import { FailedAttempt } from "./FailedAttempt";

export async function attemptAsync<T>(f: () => T | PromiseLike<T>) {
  try {
    return await f();
  } catch (error) {
    return new FailedAttempt(error);
  }
}
