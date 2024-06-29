import { describe, expect, it } from "vitest";
import { isNullish } from "./isNullish";
import util from "node:util";

describe("isNullish", () => {
  it("should return true for null", () => {
    expect(isNullish(null)).toBe(true);
  });

  it("should return true for undefined", () => {
    expect(isNullish(undefined)).toBe(true);
  });

  for (const x of [
    "",
    "0",
    true,
    false,
    0,
    1,
    -1,
    {},
    [],
    0n,
    1n,
    -1n,
    Symbol(),
  ] as const) {
    it(`should return false for ${util.inspect(x)}`, () => {
      expect(isNullish(x)).toBe(false);
    });
  }
});
