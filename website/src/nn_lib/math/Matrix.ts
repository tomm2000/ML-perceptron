export abstract class Matrix {
  rows: number
  cols: number

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
  }

  abstract set(row: number, col: number, value: number): void
  abstract get(row: number, col: number): number
}