/* eslint-disable no-restricted-globals */
// myWorker.js

self.onmessage = function (e) {
  const data = e.data;
  // Perform heavy computations
  const result = heavyComputation(data);
  self.postMessage(result);
};

function heavyComputation(data) {
  // heavy computation logic here
  return data; 
}
