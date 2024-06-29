import { FailedAttempt } from "./FailedAttempt";

export function attemptSync<T>(f: () => T) {
  try {
    return f();
  } catch (error) {
    return new FailedAttempt(error);
  }
}
