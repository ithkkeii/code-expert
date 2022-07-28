function fibonacci(n) {
      if (n < 2) return n;
      return fibonacci(n - 2) + fibonacci(n - 1);
    }
const workerpool = require("workerpool");
workerpool.worker({
  fibonacci,
});