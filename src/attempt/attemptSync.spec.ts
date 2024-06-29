import fc from "fast-check";

import { describe, expect, it } from "vitest";
import { attemptSync } from "./attemptSync";
import { FailedAttempt } from "./FailedAttempt";

describe("attemptSync", () => {
  it("can return anything", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const result = attemptSync(() => anything);

        expect(result).toBe(anything);
      })
    );
  });

  it("returns a FailedAttempt when anything is thrown", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const result = attemptSync(() => {
          throw anything;
        });

        expect(result).toBeInstanceOf(FailedAttempt);

        expect(result.failure).toBe(anything);
      })
    );
  });

  it("does not do anything with resolved promises", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const resolvePromise = Promise.resolve(anything);

        const result = attemptSync(() => resolvePromise);

        expect(result).toBe(resolvePromise);
      })
    );
  });

  it("does not do anything with rejected promises", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const rejectedPromise = Promise.reject(anything);

        const result = attemptSync(() => rejectedPromise);

        expect(result).toBe(rejectedPromise);

        // Handle the promise so it doesn't throw an unhandled rejection error.
        rejectedPromise.catch(() => {});
      })
    );
  });
});
