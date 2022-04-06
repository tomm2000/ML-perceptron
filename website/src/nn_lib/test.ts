import * as GPU_MATRIX from "./matrix_gpu/Matrix";
import * as GPU_MATH from "./matrix_gpu/matrix_math";

import * as CPU_MATRIX from "./matrix_cpu/Matrix";
import * as CPU_MATH from "./matrix_cpu/matrix_math";

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
  let matrix11 = new CPU_MATRIX.Matrix(700, 300)
  let matrix12 = new CPU_MATRIX.Matrix(300, 400)

  let matrix21 = new GPU_MATRIX.Matrix(700, 300)
  let matrix22 = new GPU_MATRIX.Matrix(300, 400)
  console.timeEnd('init')

  CPU_MATH.applyPos(matrix11)
  CPU_MATH.applyPos(matrix12)

  
  // console.log(matrix11.toString())
  // console.log(matrix12.toString())

  console.time('cpu')
  // console.log(CPU_MATH.product(matrix11, matrix12).toString())
  CPU_MATH.product(matrix11, matrix12)
  console.timeEnd('cpu')



  GPU_MATH.applyPos(matrix21)
  GPU_MATH.applyPos(matrix22)
  
  // console.log(`matrix21\n${matrix21.toString()}`)
  // console.log(`matrix22\n${matrix22.toString()}`)


  console.time('gpu')
  // console.log(`result\n${GPU_MATH.product(matrix21, matrix22).toString()}`)
  GPU_MATH.product(matrix21, matrix22)
  console.timeEnd('gpu')
}