import { describe, expect, it } from "vitest";
import { uri } from "./uri";

describe("uri", () => {
  it("passes simple strings", () => {
    expect(uri`/foo/bar`).toBe("/foo/bar");
  });

  it("encodes reserved characters", () => {
    const x = "!@#$%^&*()_+/\\";
    expect(uri`/foo/${x}/bar`).toBe(`/foo/${encodeURIComponent(x)}/bar`);
  });

  it("stringifies numbers", () => {
    expect(uri`/foo/${120}/bar`).toBe(`/foo/120/bar`);
  });

  it("stringifies true", () => {
    expect(uri`/foo/${true}/bar`).toBe(`/foo/true/bar`);
  });

  it("stringifies false", () => {
    expect(uri`/foo/${false}/bar`).toBe(`/foo/false/bar`);
  });
});
