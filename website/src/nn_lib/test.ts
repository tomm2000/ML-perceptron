import { MatrixGPU } from "./math/MatrixGPU";
import { MatrixCPU } from "./math/MatrixCPU";
import { applyPos, productCPU, productGPU } from "./math/matrix_math";

import { Network } from "./Network";
const MNIST = require('mnist-javascript')

// type setType = {
//   training: { input: number[], output: number[] }[],
//   test: { input: number[], output: number[] }[]
// }

export function xorTest() {
  const mnist = new MNIST()

  // let set: setType = mnist.set(8000, 100)

  // let { training, test } = set
  // let network = new Network([784, 200, 10], 'CPU')

  // for(let data of training) {
  //   network.train(data.input, data.output, 0.1)
  // }

  // console.log('trained')

  // for(let data of test) {
  //   let meanError = network.getMeanError(data.input, data.output)
  //   console.log(meanError)
  // }
}