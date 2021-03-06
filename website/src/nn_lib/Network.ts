import { Matrix } from "./Matrix"
import { applyDsigmoid, applyLambda, applySigmoid, mul, mulScalar, product, randomize, sub, sum, transpose } from "./matrix_math"

export class Network {
  private layer_size: number[]
  private weights: Matrix[]

  constructor(layer_size: number[]) {
    this.layer_size = layer_size
    this.weights = []

    for(let i = 0; i < layer_size.length - 1; i++) {
      let layer = layer_size[i]

      if(i == 0) { layer += 1 }

      this.weights[i] = new Matrix(layer_size[i+1], layer)
      randomize(this.weights[i])
    }
  }

  feedForward(input_array: number[]): Matrix {
    if(input_array.length != this.layer_size[0]) { throw "Input array size does not match network input size" }

    // BIAS
    input_array.push(1);

    let outputs = Matrix.fromArrayCol(input_array)

    for(let i = 0; i < this.weights.length; i++) {
      outputs = product(this.weights[i], outputs)

      applySigmoid(outputs)
    }

    return outputs
  }

  getErrors(input_array: number[], target_array: number[]): Matrix {
    let outputs = this.feedForward(input_array)
    let targets = Matrix.fromArrayCol(target_array)

    return sub(targets, outputs)
  }

  getMeanError(input_array: number[], target_array: number[]): number {
    let errors = this.getErrors(input_array, target_array)
    let sum = 0
    
    for(let row = 0; row < errors.rows; row++) {
      for(let col = 0; col < errors.cols; col++) {
        sum += errors.get(row, col)
      }
    }
    return sum / (errors.rows * errors.cols)
  }

  getTotalError(input_array: number[], target_array: number[]): number {
    let errors = this.getErrors(input_array, target_array)
    let sum = 0
    
    for(let row = 0; row < errors.rows; row++) {
      for(let col = 0; col < errors.cols; col++) {
        sum += errors.get(row, col)
      }
    }
    return sum
  }

  train(input_array: number[], target_array: number[], learning_rate: number) {
    if(input_array.length != this.layer_size[0]) { throw `Input array size does not match network input size ${input_array.length} ${this.layer_size[0]}` }

    //-==== FEED FORWARD ====-
    // BIAS
    let inputs = input_array.slice()
    inputs.push(1)

    let outputs = [Matrix.fromArrayCol(inputs)]

    for(let i = 0; i < this.weights.length; i++) {
      let tmp = product(this.weights[i], outputs[i])

      applySigmoid(tmp)
      outputs.push(tmp)

    }
    //-========================-

    //-==== BACK PROPAGATION ====-
    let error = sub(Matrix.fromArrayCol(target_array), outputs[outputs.length-1])

    for(let i = this.weights.length - 1; i >= 0; i--) {
      // ---- GRADIENT ----
      applyDsigmoid(outputs[i+1])
      let gradient = mul(error, outputs[i+1])
      mulScalar(gradient, learning_rate)
      // ------------------

      // ---- DELTA -------
      let t_outputs = transpose(outputs[i])

      let delta = product(gradient, t_outputs)
      // ------------------

      //---- UPDATE WEIGHTS ----
      let t_weights = transpose(this.weights[i])

      error = product(t_weights, error)

      this.weights[i] = sum(this.weights[i], delta)
      // -----------------------
    //-========================-
    }
  }

  toString() {
    let result = ""
    for(let i = 0; i < this.weights.length; i++) {
      result += `Layer ${i+1}:\n`
      result += this.weights[i].toString()
      result += "\n"
    }
    return result
  }
  
  guessY(x: number){
    let w = this.weights[0].toArray()

    // if(k % 60 == 0){
    //   console.log(w)
    // }
    // k++

    let w0 = w[0]
    let w1 = w[1]
    let w2 = w[2]

    // 
    return -(w2/w1) - (w0/w1)  * x
  }
}

let k = 0