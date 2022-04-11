import { gridToArray } from "./matrix_math.js"

export class Matrix {
  data: Float32Array
  rows: number
  cols: number

  constructor(rows: number, cols: number, data?: Float32Array) {
    this.rows = rows
    this.cols = cols
    this.data = data || new Float32Array(rows * cols * 4)
  }

  set(row: number, col: number, value: number) {
    this.data[gridToArray(row, col, this.rows, this.cols, 4)] = value
  }

  get(row: number, col: number): number {
    return this.data[gridToArray(row, col, this.rows, this.cols, 4)]
  }

  toArray(): number[] {
    if(this.rows == 1) {
      let result: number[] = []
      for(let i = 0; i < this.cols; i++) {
        result[i] = this.get(0, i)
      }
      return result

    } else if(this.cols == 1) {
      let result = []
      for(let row = 0; row < this.rows; row ++) {
        result.push(this.get(row, 0))
      }
      return result;
    } else {
      throw "Cannot convert matrix to array"
    }
  }

  static fromArrayRow(array: number[]): Matrix {
    let matrix = new Matrix(1, array.length)
    for(let i = 0; i < array.length; i++) {
      matrix.set(0, i, array[i]);
    }
    return matrix
  }

  static fromArrayCol(array: number[]): Matrix {
    let matrix = new Matrix(array.length, 1)
    for(let i = 0; i < array.length; i++) {
      matrix.set(i, 0, array[i]);
    }
    return matrix
  } 

  toString() {
    let result = ""
    for(let row = 0; row < this.rows; row ++) {
      for(let col = 0; col < this.cols; col ++) {
        result += this.get(row, col).toFixed(2) + " "
      }
      result += "\n"
    }
    return result
  }
}