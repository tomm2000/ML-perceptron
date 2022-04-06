import { MatrixGPU } from "./math/MatrixGPU";
import { MatrixCPU } from "./math/MatrixCPU";
import { applyPos, productCPU, productGPU } from "./math/matrix_math";

import { Network } from "./Network";

export function xorTest() {
  // const network = new Network([2, 3, 1]);

  // const training_data = [
  //   { input: [0, 0], output: [0] },
  //   { input: [1, 0], output: [1] },
  //   { input: [0, 1], output: [1] },
  //   { input: [1, 1], output: [0] },
  // ]

  // for(let i = 0; i < 10000; i++) {
  //   let data = training_data[Math.floor(Math.random() * training_data.length)]
  //   network.train(data.input, data.output, 0.2);
  // }

  // for(let data of training_data) {
  //   console.log(network.feedForward(data.input).toString())
  // }

  console.time('init')
  let matrix11 = new MatrixCPU(700, 300)
  let matrix12 = new MatrixCPU(300, 400)

  let matrix21 = new MatrixGPU(700, 300)
  let matrix22 = new MatrixGPU(300, 400)
  console.timeEnd('init')

  applyPos(matrix11)
  applyPos(matrix12)


  console.time('cpu')
  // console.log(CPU_MATH.product(matrix11, matrix12).toString())
  productCPU(matrix11, matrix12, 'CPU')
  console.timeEnd('cpu')



  applyPos(matrix21)
  applyPos(matrix22)
  
  // console.log(`matrix21\n${matrix21.toString()}`)
  // console.log(`matrix22\n${matrix22.toString()}`)


  console.time('gpu')
  // console.log(`result\n${GPU_MATH.product(matrix21, matrix22).toString()}`)
  productGPU(matrix21, matrix22)
  console.timeEnd('gpu')
}