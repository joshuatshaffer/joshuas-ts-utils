import fc from "fast-check";

import { describe, expect, it } from "vitest";
import { attemptAsync } from "./attemptAsync";
import { FailedAttempt } from "./FailedAttempt";

describe("attemptAsync", () => {
  it("can return anything", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attemptAsync(() => anything);

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBe(anything);
      })
    );
  });

  it("can resolve anything", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attemptAsync(() => Promise.resolve(anything));

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBe(anything);
      })
    );
  });

  it("returns a Promise<FailedAttempt> when anything is thrown", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attemptAsync(() => {
          throw anything;
        });

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBeInstanceOf(FailedAttempt);

        expect(awaitedResult.failure).toBe(anything);
      })
    );
  });

  it("returns a Promise<FailedAttempt> when rejected with anything", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attemptAsync(() => Promise.reject(anything));

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBeInstanceOf(FailedAttempt);

        expect(awaitedResult.failure).toBe(anything);
      })
    );
  });
});
