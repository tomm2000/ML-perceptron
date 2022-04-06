import { Matrix } from "./Matrix";

// ---- SCALAR MATH ----
export function applyLambda(matrix: Matrix, lambda: (value: number) => number) {
  for(let row = 0; row < matrix.rows; row ++) {
    for(let col = 0; col < matrix.cols; col ++) {
      let val = matrix.get(row, col);

      matrix.set(row, col, lambda(val));
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
export function product(matrix1: Matrix, matrix2: Matrix): Matrix {
  if(matrix1.cols !== matrix2.rows) {
    throw new Error("Matrix dimensions do not match");
  }

  let result = new Matrix(matrix1.rows, matrix2.cols);

  for(let row = 0; row < matrix1.rows; row ++) {
    for(let col = 0; col < matrix2.cols; col ++) {
      let sum = 0;

      for(let i = 0; i < matrix1.cols; i ++) {
        sum += matrix1.get(row, i) * matrix2.get(i, col);
      }

      result.set(row, col, sum);
    }
  }

  return result;
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