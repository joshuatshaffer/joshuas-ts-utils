export type EncodableUriComponent = Parameters<typeof encodeURIComponent>[0];

/**
 * Encodes URI components in a template string.
 *
 * ```ts
 * uri`/foo/${x}/bar/${y}`
 * ```
 *
 * is equivalent to
 *
 * ```ts
 * "/foo/" + encodeURIComponent(x) + "/bar/" + encodeURIComponent(y)
 * ```
 */
export function uri(
  strings: TemplateStringsArray,
  ...values: EncodableUriComponent[]
): string {
  return strings.reduce(
    (result, string, i) => result + encodeURIComponent(values[i - 1]) + string
  );
}
