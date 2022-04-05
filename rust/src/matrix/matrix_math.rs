use super::matrix::Matrix;

// ---- SCALAR MATH ----
pub fn sum_scalar(matrix: &mut Matrix, scalar: f32) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, matrix.get(row, col) + scalar);
    }
  }
}
pub fn sum_scalar_new(matrix: &Matrix, scalar: f32) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, matrix.get(row, col) + scalar);
    }
  }

  return output
}

pub fn sub_scalar(matrix: &mut Matrix, scalar: f32) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, matrix.get(row, col) - scalar);
    }
  }
}
pub fn sub_scalar_new(matrix: &Matrix, scalar: f32) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, matrix.get(row, col) - scalar);
    }
  }

  return output
}

pub fn mul_scalar(matrix: &mut Matrix, scalar: f32) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, matrix.get(row, col) * scalar);
    }
  }
}
pub fn mul_scalar_new(matrix: &Matrix, scalar: f32) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, matrix.get(row, col) * scalar);
    }
  }

  return output
}

pub fn div_scalar(matrix: &mut Matrix, scalar: f32) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, matrix.get(row, col) / scalar);
    }
  }
}
pub fn div_scalar_new(matrix: &Matrix, scalar: f32) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, matrix.get(row, col) / scalar);
    }
  }

  return output
}

pub fn randomize(matrix: &mut Matrix) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, fastrand::f32());
    }
  }
}
pub fn randomize_new(matrix: &Matrix) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, fastrand::f32());
    }
  }

  return output
}

pub fn apply_sigmoid(matrix: &mut Matrix) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, 1.0 / (1.0 + (-matrix.get(row, col)).exp()));
    }
  }
}
pub fn apply_sigmoid_new(matrix: &Matrix) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, 1.0 / (1.0 + (-matrix.get(row, col)).exp()));
    }
  }

  return output
}

pub fn apply_dsigmoid(matrix: &mut Matrix) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, matrix.get(row, col) * (1.0 - matrix.get(row, col)));
    }
  }
}
pub fn apply_dsigmoid_new(matrix: &Matrix) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, matrix.get(row, col) * (1.0 - matrix.get(row, col)));
    }
  }

  return output
}

pub fn one_minus(matrix: &mut Matrix) {
  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      matrix.set(row, col, 1.0 - matrix.get(row, col));
    }
  }
}
pub fn one_minus_new(matrix: &Matrix) -> Matrix {
  let mut output = Matrix::new(matrix.rows(), matrix.cols());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(row, col, 1.0 - matrix.get(row, col));
    }
  }

  return output
}

// ---- ELEMENT-WISE MATH ----
pub fn sum(matrix1: &Matrix, matrix2: &Matrix) -> Matrix {
  if matrix1.rows() != matrix2.rows() || matrix1.cols() != matrix2.cols() {
    panic!("Matrices must be the same size");
  }

  let mut output = Matrix::new(matrix1.rows(), matrix1.cols());

  for row in 0..matrix1.rows() {
    for col in 0..matrix1.cols() {
      output.set(row, col, matrix1.get(row, col) + matrix2.get(row, col));
    }
  }

  output
}
pub fn sub(matrix1: &Matrix, matrix2: &Matrix) -> Matrix {
  if matrix1.rows() != matrix2.rows() || matrix1.cols() != matrix2.cols() {
    panic!("Matrices must be the same size");
  }

  let mut output = Matrix::new(matrix1.rows(), matrix1.cols());

  for row in 0..matrix1.rows() {
    for col in 0..matrix1.cols() {
      output.set(row, col, matrix1.get(row, col) - matrix2.get(row, col));
    }
  }

  output
}
pub fn mul(matrix1: &Matrix, matrix2: &Matrix) -> Matrix {
  if matrix1.rows() != matrix2.rows() || matrix1.cols() != matrix2.cols() {
    panic!("Matrices must be the same size");
  }

  let mut output = Matrix::new(matrix1.rows(), matrix1.cols());

  for row in 0..matrix1.rows() {
    for col in 0..matrix1.cols() {
      output.set(row, col, matrix1.get(row, col) * matrix2.get(row, col));
    }
  }

  output
}
pub fn div(matrix1: &Matrix, matrix2: &Matrix) -> Matrix {
  if matrix1.rows() != matrix2.rows() || matrix1.cols() != matrix2.cols() {
    panic!("Matrices must be the same size");
  }

  let mut output = Matrix::new(matrix1.rows(), matrix1.cols());

  for row in 0..matrix1.rows() {
    for col in 0..matrix1.cols() {
      output.set(row, col, matrix1.get(row, col) / matrix2.get(row, col));
    }
  }

  output
}

// ---- MATRIX MATH ----
pub fn transpose_new(matrix: &Matrix) -> Matrix {
  let mut output = Matrix::new(matrix.cols(), matrix.rows());

  for row in 0..matrix.rows() {
    for col in 0..matrix.cols() {
      output.set(col, row, matrix.get(row, col));
    }
  }

  output
}
/**
 * matrix1.cols == matrix2.rows
 * o.rows = 1.rows
 * o.cols = 2.cols
*/
pub fn product(matrix1: &Matrix, matrix2: &Matrix) -> Matrix {
  if matrix1.cols() != matrix2.rows() { panic!("Matrix dimensions do not match"); }

  let mut result = Matrix::new(matrix1.rows(), matrix2.cols());

  for row in 0..matrix1.rows() {
    for col in 0..matrix2.cols() {
      let mut sum = 0.0;
      for i in 0..matrix1.cols() {
        sum += matrix1.get(row, i) * matrix2.get(i, col);
      }
      result.set(row, col, sum);
    }
  }

  result
}
