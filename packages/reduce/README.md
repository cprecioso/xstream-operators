# xstream-reduce

Reduces an entire stream into a single value.

Takes a function which applies the every value to the accumulating result and
returns the new result. Returns a promise for the result that will be fulfilled
when the stream ends, or rejected if the stream errors.

Note that this function will start consuming the stream, and the resulting value
will not be a stream.

> Conceptually similar to
> [the `reduce` method on arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

> Lifted from
> [the most.js `reduce` operator](https://github.com/cujojs/most/blob/master/docs/api.md#reduce).

## Example

```js
import reduce from "xstream-reduce"

// ...

const goalsByTeam = goalsStream.compose(
  reduce((accumulator, goal) => {
    if (!accumulator[goal.team]) accumulator[goal.team] = []
    accumulator[goal.team].push(goal)
    return accumulator
  }, {})
)

goalsByTeam.then(obj =>
  // Will be called when match ends
  console.log(`The Red team scored ${obj["Red"].length} goals. You go, Reds!`)
)
```
