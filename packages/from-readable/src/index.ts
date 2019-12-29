import xs, { Stream } from "xstream"
import fromEvent from "xstream/extra/fromEvent"

interface Options {
  dataEventName?: string
  endEventName?: string
  errorEventName?: string
}

/**
 * Turns a Node.js Readable into an Xstream
 *
 * By default it will listen for the `data`, `end`, and `error` events; and act accordingly.
 * You can change this passing an object to the second argument.
 */

function fromReadable<T = any>(
  stream: NodeJS.ReadableStream,
  options?: Options
): Stream<T> {
  const {
    dataEventName = "data",
    endEventName = "end",
    errorEventName = "error"
  } = options || {}

  const data$ = fromEvent<T>(stream, dataEventName)
  const end$ = fromEvent<void>(stream, endEventName).take(1)
  const error$ = fromEvent<any>(stream, errorEventName)
    .take(1)
    .map(error => {
      throw error
    })

  const stream$ = xs.merge(data$, error$).endWhen(end$)
  return stream$
}

export default fromReadable
