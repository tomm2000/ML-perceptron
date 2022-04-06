import { Matrix } from "./Matrix"

export class MatrixCPU extends Matrix {
  data: number[][]

  constructor(rows: number, cols: number) {
    super(rows, cols)
    this.data = []

    // for(let col = 0; col < cols; col ++) {
      // this.data[col] = new Array(rows)
      // for(let col = 0; col < cols; col ++) {
      //   this.data[row][col] = 0
      // }
    // }

    for(let row = 0; row < rows; row ++) {
      for(let col = 0; col < cols; col ++) {
        this.data[row] = this.data[row] || []
        this.data[row][col] = 0
      }
    }

    // console.log(rows, cols)
    // console.table(this.data)
  }

  set(row: number, col: number, value: number) {
    this.data[row][col] = value
  }

  get(row: number, col: number): number {
    return this.data[row][col]
  }

  toArray() {
    if(this.rows == 1) {
      return this.data[0]
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
    let matrix = new MatrixCPU(1, array.length)
    for(let i = 0; i < array.length; i++) {
      matrix.set(0, i, array[i]);
    }
    return matrix
  }

  static fromArrayCol(array: number[]): Matrix {
    let matrix = new MatrixCPU(array.length, 1)
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