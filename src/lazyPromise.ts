export function lazyPromise<T>(f: () => T | PromiseLike<T>) {
  let cachedResult: Promise<Awaited<T>> | undefined;

  return {
    then: (...args) => {
      cachedResult ??= Promise.resolve(f());
      return cachedResult.then(...args);
    },
  } satisfies PromiseLike<Awaited<T>>;
}
