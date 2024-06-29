export type OmitUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<
    T[K],
    undefined
  >;
};

export function omitUndefined<T extends NonNullable<unknown>>(obj: T) {
  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as OmitUndefined<T>;
}
