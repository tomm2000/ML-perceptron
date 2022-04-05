use crate::matrix::{matrix::Matrix, matrix_math::{randomize, product, apply_sigmoid, sub, apply_dsigmoid, mul, mul_scalar, transpose_new, sum}};

pub struct Network {
  pub layer_size: Vec<usize>,
  pub weights: Vec<Matrix>,
}

impl Network {
  pub fn new(layer_size: Vec<usize>) -> Network {
    if layer_size.len() < 2 { panic!("Network must have at least 2 layers"); }

    let mut weights = Vec::new();

    for i in 0..layer_size.len() - 1 {
      let mut n = layer_size[i];

      if i == 0 { n += 1 } // BIAS

      let mut matrix = Matrix::new(layer_size[i + 1], n);
      randomize(&mut matrix);
      weights.push(matrix);
    }

    Network {
      layer_size, weights
    }
  }

  pub fn feed_forward(&self, input_array: &Vec<f32>) -> Matrix {
    if input_array.len() != self.layer_size[0] { panic!("Input array size does not match network input size"); }

    let mut input_array = input_array.clone();

    // BIAS
    input_array.push(1.0);

    let mut outputs: Matrix = Matrix::from_array_col(&input_array);

    for i in 0..self.weights.len() {
      outputs = product(&self.weights[i], &outputs);

      apply_sigmoid(&mut outputs);
    }

    outputs
  }

  pub fn get_errors(&self, input_array: &Vec<f32>, target_array: &Vec<f32>) -> Matrix {
    let output = self.feed_forward(input_array);
    let target = Matrix::from_array_col(target_array);

    sub(&target, &output)
  }

  // Delta = lr x Error (Vector) x (O + (1 - O)) (Vector) * Weights^t  (Matrix)

  pub fn train(&mut self, input_array: &Vec<f32>, target_array: &Vec<f32>, learning_rate: f32) {
    if input_array.len() != self.layer_size[0] { panic!("Input array size does not match network input size"); }

    //-==== FEED FORWARD ====-
    let mut input_array = input_array.clone();

    // BIAS
    input_array.push(1.0);

    let mut outputs = vec![Matrix::from_array_col(&input_array)];

    for i in 0..self.weights.len() {
      let mut tmp = product(&self.weights[i],&outputs[i]);

      apply_sigmoid(&mut tmp);

      outputs.push(tmp);
    }
    //-========================-

    //-==== BACK PROPAGATION ====-
    let mut error = sub(&Matrix::from_array_col(target_array), outputs.last().unwrap());

    for i in (0..self.weights.len()).rev() {
      // ---- GRADIENT ----
      apply_dsigmoid(&mut outputs[i+1]);
      let mut gradient = mul(&error, &outputs[i+1]);
      mul_scalar(&mut gradient, learning_rate);
      // ------------------

      // ---- DELTA -------
      let t_outputs = transpose_new(&outputs[i]);

      let delta = product(&gradient, &t_outputs);
      // ------------------

      //---- UPDATE WEIGHTS ----
      let t_weights = transpose_new(&self.weights[i]);
      error = product(&t_weights, &error);

      self.weights[i] = sum(&self.weights[i], &delta);
      // -----------------------
    }
    //-========================-
  }

  pub fn display(&self) {
    println!("Network:");
    for i in 0..self.weights.len() {
      println!("Layer {}", i);
      println!("{}", self.weights[i]);
    }
  }
}
