import { describe, it, expect } from "vitest";
import { omitUndefined } from "./omitUndefined";

describe("omitUndefined", () => {
  it("removes undefined properties of an object", () => {
    const original = {
      a: 0,
      b: NaN,
      e: undefined,
      c: "",
      d: null,
    };

    const expected = {
      a: 0,
      b: NaN,
      c: "",
      d: null,
    };

    const result = omitUndefined(original);

    expect(result).toEqual(expected);

    // Make sure the result is actually missing the undefined properties.
    expect(Object.keys(result)).toEqual(Object.keys(expected));
  });
});
