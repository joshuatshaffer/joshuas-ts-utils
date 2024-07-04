import { isIterable } from "../isIterable";

/**
 * Like {@link Array.map}, but for any iterable.
 *
 * The callback function is not given indices. If you need indices,
 * use `iterMap(iterEntries(values), ([index, value]) => {...})`.
 */
export function* iterMap<T, U>(
  values: Iterable<T>,
  fn: (value: T) => U
): IterableIterator<U> {
  for (const value of values) {
    yield fn(value);
  }
}

/**
 * Like {@link Array.filter}, but for any iterable.
 */
export function iterFilter<T, S extends T>(
  values: Iterable<T>,
  predicate: (value: T) => value is S
): IterableIterator<S>;

export function iterFilter<T>(
  values: Iterable<T>,
  predicate: (value: T) => boolean
): IterableIterator<T>;

export function* iterFilter<T>(
  values: Iterable<T>,
  predicate: (value: T) => boolean
): IterableIterator<T> {
  for (const value of values) {
    if (predicate(value)) {
      yield value;
    }
  }
}

/**
 * Like {@link Array.flatMap}, but for any iterable.
 */
export function* iterFlatMap<T, U>(
  values: Iterable<T>,
  fn: (value: T) => U | Iterable<U>
): IterableIterator<U> {
  for (const value of values) {
    const x = fn(value);
    if (isIterable(x)) {
      yield* x;
    } else {
      yield x;
    }
  }
}

/**
 * Like {@link Array.entries}, but for any iterable.
 */
export function* iterEntries<T>(
  values: Iterable<T>
): IterableIterator<[index: number, value: T]> {
  let index = 0;
  for (const value of values) {
    yield [index, value] as const;
    index++;
  }
}

/**
 * Like {@link iterEntries}, but uses a bigint for the index.
 */
export function* iterEntriesBigint<T>(
  values: Iterable<T>
): IterableIterator<[index: bigint, value: T]> {
  let index = 0n;
  for (const value of values) {
    yield [index, value] as const;
    index++;
  }
}

export type IterZipValue<T extends readonly Iterable<unknown>[]> = {
  [K in keyof T]: T[K] extends Iterable<infer U> ? U : never;
};

export function* iterZip<const T extends readonly Iterable<unknown>[]>(
  ...iterables: T
): IterableIterator<IterZipValue<T>> {
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());

  while (true) {
    const results = iterators.map((iterator) => iterator.next());

    if (results.some((result) => result.done)) {
      break;
    }

    yield results.map((result) => result.value) as IterZipValue<T>;
  }
}

/**
 * Like {@link Array.concat}, but for any iterable.
 */
export function* iterConcat<T>(
  ...iterables: Iterable<T>[]
): IterableIterator<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
