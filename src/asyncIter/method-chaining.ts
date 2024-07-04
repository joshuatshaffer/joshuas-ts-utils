import {
  MultisyncIterable,
  asyncIterConcat,
  asyncIterEntries,
  asyncIterEntriesBigint,
  asyncIterFilter,
  asyncIterFlatMap,
  asyncIterMap,
  asyncIterZip,
} from "./tree-shakable";

class AsyncIterableWithUtils<T> implements AsyncIterable<T> {
  constructor(private readonly values: AsyncIterable<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.values[Symbol.asyncIterator]();
  }

  /**
   * Like {@link Array.map}, but for any async iterable.
   *
   * The callback function is not given indices. If you need indices,
   * use `iter(values).entries().map(([index, value]) => {...})`.
   */
  map<U>(fn: (value: T) => U) {
    return new AsyncIterableWithUtils(asyncIterMap(this.values, fn));
  }

  /**
   * Like {@link Array.filter}, but for any async iterable.
   */
  filter<S extends T>(
    predicate: (value: T) => value is S
  ): AsyncIterableWithUtils<S>;

  filter(predicate: (value: T) => boolean): AsyncIterableWithUtils<T>;

  filter(predicate: (value: T) => boolean) {
    return new AsyncIterableWithUtils(asyncIterFilter(this.values, predicate));
  }

  /**
   * Like {@link Array.flatMap}, but for any async iterable.
   */
  flatMap<U>(fn: (value: T) => U | MultisyncIterable<U>) {
    return new AsyncIterableWithUtils(asyncIterFlatMap(this.values, fn));
  }

  /**
   * Like {@link Array.entries}, but for any async iterable.
   */
  entries() {
    return new AsyncIterableWithUtils(asyncIterEntries(this.values));
  }

  /**
   * Like {@link entries}, but uses a bigint for the index.
   */
  entriesBigint() {
    return new AsyncIterableWithUtils(asyncIterEntriesBigint(this.values));
  }

  zip<const U extends readonly MultisyncIterable<unknown>[]>(
    ...otherIterables: U
  ) {
    return new AsyncIterableWithUtils(
      asyncIterZip(this.values, ...otherIterables)
    );
  }

  /**
   * Like {@link Array.concat}, but for any async iterable.
   */
  concat(...otherIterables: MultisyncIterable<T>[]) {
    return new AsyncIterableWithUtils(
      asyncIterConcat(this.values, ...otherIterables)
    );
  }

  async toArray() {
    const result: T[] = [];
    for await (const value of this.values) {
      result.push(value);
    }
    return result;
  }
}

export function asyncIter<T>(values: AsyncIterable<T>) {
  return new AsyncIterableWithUtils(values);
}
