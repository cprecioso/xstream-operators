import { Stream } from "xstream"

/**
 * Reduces an entire stream into a single value.
 *
 * Takes a function which applies the every value to the accumulating result and returns the new result.
 * Returns a promise for the result that will be fulfilled when the stream ends, or rejected if the stream errors.
 *
 * Note that this function will start consuming the stream, and the resulting value will not be a stream.
 */

export default function reduce<T, R>(
  fn: (accumulator: R, value: T) => R,
  seed: R
) {
  return (in$: Stream<T>) =>
    new Promise<R>((fulfill, reject) => {
      let accumulator = seed
      in$.subscribe({
        next: value => {
          accumulator = fn(accumulator, value)
        },
        complete: () => {
          fulfill(accumulator)
        },
        error: error => {
          reject(error)
        }
      })
    })
}
