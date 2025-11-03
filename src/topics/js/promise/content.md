# JavaScript Promises

## Overview
Promises provide a native way to handle asynchronous operations in JavaScript. They represent a value that will be resolved in the future and let you write cleaner code than nested callbacks.

## Example Explained
In this example we:

1. Create a new `Promise` that waits one second before resolving.
2. Chain a `.then()` handler to transform the resolved value.
3. Await the final result and log each step to the console.

```ts
const promise = new Promise<string>((resolve) => {
  setTimeout(() => resolve('Promise resolved value'), 1000);
});

const result = await promise.then((value) => value.toUpperCase());
```

## Try It Yourself
- Change the timeout duration to see how the delay affects the logs.
- Add a `.catch()` handler to see how errors are handled.
- Try chaining multiple `then` calls to transform the value step-by-step.
