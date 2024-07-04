import { isAsyncIterable } from "../isAsyncIterable";
import { isIterable } from "../isIterable";

export type MultisyncIterable<T> = Iterable<T> | AsyncIterable<T>;

/**
 * Like {@link Array.map}, but for any async iterable.
 *
 * The callback function is not given indices. If you need indices,
 * use `asyncIterMap(asyncIterEntries(values), ([index, value]) => {...})`.
 */
export async function* asyncIterMap<T, U>(
  values: MultisyncIterable<T>,
  fn: (value: T) => U
): AsyncIterableIterator<U> {
  for await (const value of values) {
    yield fn(value);
  }
}

/**
 * Like {@link Array.filter}, but for any async iterable.
 */
export function asyncIterFilter<T, S extends T>(
  values: MultisyncIterable<T>,
  predicate: (value: T) => value is S
): AsyncIterableIterator<S>;

export function asyncIterFilter<T>(
  values: MultisyncIterable<T>,
  predicate: (value: T) => boolean
): AsyncIterableIterator<T>;

export async function* asyncIterFilter<T>(
  values: MultisyncIterable<T>,
  predicate: (value: T) => boolean
): AsyncIterableIterator<T> {
  for await (const value of values) {
    if (predicate(value)) {
      yield value;
    }
  }
}

/**
 * Like {@link Array.flatMap}, but for any async iterable.
 */
export async function* asyncIterFlatMap<T, U>(
  values: MultisyncIterable<T>,
  fn: (value: T) => U | AsyncIterable<U>
): AsyncIterableIterator<U> {
  for await (const value of values) {
    const x = fn(value);
    if (isAsyncIterable(x)) {
      yield* x;
    } else {
      yield x;
    }
  }
}

/**
 * Like {@link Array.entries}, but for any async iterable.
 */
export async function* asyncIterEntries<T>(
  values: MultisyncIterable<T>
): AsyncIterableIterator<[index: number, value: T]> {
  let index = 0;
  for await (const value of values) {
    yield [index, value] as const;
    index++;
  }
}

/**
 * Like {@link asyncIterEntries}, but uses a bigint for the index.
 */
export async function* asyncIterEntriesBigint<T>(
  values: MultisyncIterable<T>
): AsyncIterableIterator<[index: bigint, value: T]> {
  let index = 0n;
  for await (const value of values) {
    yield [index, value] as const;
    index++;
  }
}

export type MultisyncIterZipValue<
  T extends readonly MultisyncIterable<unknown>[],
> = {
  [K in keyof T]: T[K] extends MultisyncIterable<infer U> ? U : never;
};

export async function* asyncIterZip<
  const T extends readonly MultisyncIterable<unknown>[],
>(...iterables: T): AsyncIterableIterator<MultisyncIterZipValue<T>> {
  const iterators = iterables.map((iterable) =>
    isIterable(iterable)
      ? iterable[Symbol.iterator]()
      : iterable[Symbol.asyncIterator]()
  );

  while (true) {
    const results = await Promise.all(
      iterators.map((iterator) => iterator.next())
    );

    if (results.some((result) => result.done)) {
      break;
    }

    yield results.map((result) => result.value) as MultisyncIterZipValue<T>;
  }
}

/**
 * Like {@link Array.concat}, but for any async iterable.
 */
export async function* asyncIterConcat<T>(
  ...iterables: MultisyncIterable<T>[]
): AsyncIterableIterator<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
