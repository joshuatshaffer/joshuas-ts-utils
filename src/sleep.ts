export function sleep(ms: number, { signal }: { signal?: AbortSignal } = {}) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve();
    }, ms);

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(signal.reason);
    });
  });
}
