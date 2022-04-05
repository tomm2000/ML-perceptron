pub struct Matrix {
  data: Vec<Vec<f32>>,
  rows: usize,
  cols: usize
}

impl Matrix {
  pub fn new(rows: usize, cols: usize) -> Matrix {
    Matrix {
      data: vec![vec![0.0; cols]; rows],
      rows,
      cols
    }
  }

  pub fn get(&self, row: usize, col: usize) -> f32 {
    self.data[row][col]
  }

  pub fn set(&mut self, row: usize, col: usize, value: f32) {
    self.data[row][col] = value;
  }

  pub fn rows(&self) -> usize {
    self.rows
  }

  pub fn cols(&self) -> usize {
    self.cols
  }

  pub fn to_array(&self) -> Vec<f32> {
    if self.rows() == 1 {
      return self.data[0].to_vec();
    } else if self.cols() == 1 {
      let mut result = vec![];
      for row in 0..self.rows() {
        result.push(self.get(row, 0));
      }
      return result;
    } else {
      panic!("Cannot convert matrix to array");
    }
  }

  pub fn from_array_row(array: &Vec<f32>) -> Matrix {
    let mut matrix = Matrix::new(1, array.len());
    for i in 0..array.len() {
      matrix.set(0, i, array[i]);
    }
    matrix
  }

  pub fn from_array_col(array: &Vec<f32>) -> Matrix {
    let mut matrix = Matrix::new(array.len(), 1);
    for i in 0..array.len() {
      matrix.data[i][0] = array[i];
    }
    matrix
  }
}

impl std::fmt::Display for Matrix {
  fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
    for row in 0..self.rows() {
      for col in 0..self.cols() {
        write!(f, "{:.5} ", self.get(row, col))?;
      }
      write!(f, "\n")?;
    }
    Ok(())
  }
}
