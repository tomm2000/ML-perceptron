import { GPGPU } from "../../lib/GPGPU";
import { Matrix } from "./Matrix";

// ---- MISC ----
export function gridToArray(row: number, col: number, rows: number, cols: number, scale: number = 1): number {
  return (row * cols + col) * scale + scale - 1
}

// ---- SCALAR MATH ----
export function applyLambda(matrix: Matrix, lambda: (value: number) => number) {
  for(let row = 0; row < matrix.rows; row ++) {
    for(let col = 0; col < matrix.cols; col ++) {
      let val = matrix.get(row, col);

      matrix.set(row, col, lambda(val));
    }
  }
}

export function applyPos(matrix: Matrix) {
  for(let row = 0; row < matrix.rows; row ++) {
    for(let col = 0; col < matrix.cols; col ++) {
      matrix.set(row, col, gridToArray(row, col, matrix.rows, matrix.cols));
    }
  }
}

export function sumScalar(matrix: Matrix, scalar: number) { applyLambda(matrix, (value) => value + scalar) }
export function subScalar(matrix: Matrix, scalar: number) { applyLambda(matrix, (value) => value - scalar) }
export function mulScalar(matrix: Matrix, scalar: number) { applyLambda(matrix, (value) => value * scalar) }
export function divScalar(matrix: Matrix, scalar: number) { applyLambda(matrix, (value) => value / scalar) }
export function randomize(matrix: Matrix) { applyLambda(matrix, (_) => Math.random()) }
export function applySigmoid(matrix: Matrix) { applyLambda(matrix, (value) => 1 / (1 + Math.exp(-value))) }
export function applyDsigmoid(matrix: Matrix) { applyLambda(matrix, (value) => value * (1 - value)) }
export function oneMinus(matrix: Matrix) { applyLambda(matrix, (value) => 1 - value) }

// ---- ELEMENT-WISE MATH ----
export function applyEwLambda(matrix1: Matrix, matrix2: Matrix, lambda: (value1: number, value2: number) => number): Matrix {
  if(matrix1.cols !== matrix2.cols || matrix1.rows !== matrix2.rows) {
    throw new Error("Matrices must be the same size");
  }

  let result = new Matrix(matrix1.rows, matrix1.cols);

  for(let row = 0; row < matrix1.rows; row ++) {
    for(let col = 0; col < matrix1.cols; col ++) {
      let val1 = matrix1.get(row, col);
      let val2 = matrix2.get(row, col);

      result.set(row, col, lambda(val1, val2));
    }
  }

  return result
}

export function sum(matrix1: Matrix, matrix2: Matrix): Matrix { return applyEwLambda(matrix1, matrix2, (value1, value2) => value1 + value2) }
export function sub(matrix1: Matrix, matrix2: Matrix): Matrix { return applyEwLambda(matrix1, matrix2, (value1, value2) => value1 - value2) }
export function mul(matrix1: Matrix, matrix2: Matrix): Matrix { return applyEwLambda(matrix1, matrix2, (value1, value2) => value1 * value2) }
export function div(matrix1: Matrix, matrix2: Matrix): Matrix { return applyEwLambda(matrix1, matrix2, (value1, value2) => value1 / value2) }


// ---- MATRIX MATH ----
const productShader = /*glsl*/`
  precision highp float;

  uniform sampler2D texture0; //matrix1
  uniform sampler2D texture1; //matrix2

  #define matrix1 texture0
  #define matrix2 texture1

  uniform float cols;
  varying vec2 vTextureCoord;

  void main() {
    float sum = 0.0;
    float i = 0.0;

    float row = vTextureCoord.y;
    float col = vTextureCoord.x;

    for(int j = 0; j < #COLS#; j++) {
      if(i >= cols) { break; }
      
      float v1 = texture2D(matrix1, vec2(i/cols, row)).a;
      float v2 = texture2D(matrix2, vec2(col, i/cols)).a;

      sum += v1 * v2;

      i += 1.0; 
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, sum);
  }
`

const GPU_CACHE_SIZE = 10

const GPU_CACHE = []


export function product(matrix1: Matrix, matrix2: Matrix): Matrix {
  if(matrix1.cols !== matrix2.rows) { throw new Error("Matrix dimensions do not match"); }

  let rows = matrix1.rows
  let cols = matrix2.cols

  // ---- 13% ms ----
  const gpu = new GPGPU({ height: rows, width: cols })
  gpu.makeFrameBuffer(cols, rows)
  // ----------------

  // ---- 12% ms ----
  let shader = productShader.replace('#COLS#', matrix1.cols.toString())
  gpu.buildProgram(shader)
  // ----------------

  // ---- 0% ms -----
  gpu.addAttrib("position", {numElements: 3, stride: 20, offset: 0})
  gpu.addAttrib("textureCoord", {numElements: 2, stride: 20, offset: 12})
  // ----------------
  
  // ---- 0% ms -----
  gpu.addUniform({name: 'cols', type: 'uniform1f', value: matrix1.cols})
  // ----------------

  // ---- 3% ms -----
  gpu.makeTexture(matrix1.data, matrix1.cols, matrix1.rows)
  gpu.makeTexture(matrix2.data, matrix2.cols, matrix2.rows)
  // ----------------

  // ---- 0% ms -----
  gpu.draw()
  // ----------------

  // ---- 70% ms ----
  let out = new Matrix(rows, cols, gpu.getPixels())
  // ----------------

  gpu.delete()

  return out
}

export function transpose(matrix: Matrix): Matrix {
  let result = new Matrix(matrix.cols, matrix.rows);

  for(let row = 0; row < matrix.rows; row ++) {
    for(let col = 0; col < matrix.cols; col ++) {
      result.set(col, row, matrix.get(row, col));
    }
  }

  return result;
}