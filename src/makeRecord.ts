export function makeRecord<K extends PropertyKey, V>(
  keys: Iterable<K>,
  makeValue: (key: K) => V
): Record<K, V> {
  const record = {} as Record<K, V>;

  for (const key of keys) {
    record[key] = makeValue(key);
  }

  return record;
}
