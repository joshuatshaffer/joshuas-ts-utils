import fc from "fast-check";

import { describe, expect, it } from "vitest";
import { attempt } from "./attempt";
import { FailedAttempt } from "./FailedAttempt";

describe("attempt", () => {
  it("can return anything", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const result = attempt(() => anything);

        expect(result).toBe(anything);
      })
    );
  });

  it("can resolve anything", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attempt(() => Promise.resolve(anything));

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBe(anything);
      })
    );
  });

  it("returns a FailedAttempt when anything is thrown", () => {
    fc.assert(
      fc.property(fc.anything(), (anything) => {
        const result = attempt(() => {
          throw anything;
        });

        expect(result).toBeInstanceOf(FailedAttempt);

        expect(result.failure).toBe(anything);
      })
    );
  });

  it("returns a Promise<FailedAttempt> when rejected with anything", async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (anything) => {
        const result = attempt(() => Promise.reject(anything));

        expect(result).toBeInstanceOf(Promise);

        const awaitedResult = await result;

        expect(awaitedResult).toBeInstanceOf(FailedAttempt);

        expect(awaitedResult.failure).toBe(anything);
      })
    );
  });
});
