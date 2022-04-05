// This crate is a library
#![crate_type = "bin"]
// The library is named "rary"
#![crate_name = "xor"]

fn main() {
  print!("hello")
}

// use crate::network::network::Network;

// use macroquad::{prelude::*, color};
// struct data{
//   input: Vec<f32>,
//   output: Vec<f32>
// }

// static GRID_SIZE: usize = 100;

// pub fn train(network: &mut Network) {
//   let dati = vec![
//     data{input: vec![0.0, 0.0], output: vec![0.0]},
//     data{input: vec![1.0, 0.0], output: vec![1.0]},
//     data{input: vec![0.0, 1.0], output: vec![1.0]},
//     data{input: vec![1.0, 1.0], output: vec![0.0]}
//   ];

  
//   // let mut network = Network::new(vec![2, 2, 1]);

//   for _ in 0..10000 {
//     let i = (fastrand::f32() * 4.0f32) as usize;
//     network.train( &dati[i].input, &dati[i].output, 0.2);
//   }

//   println!("{}", network.feed_forward(&dati[0].input));
//   println!("{}", network.feed_forward(&dati[1].input));
//   println!("{}", network.feed_forward(&dati[2].input));
//   println!("{}", network.feed_forward(&dati[3].input));
// }

// pub fn draw(network: &mut Network) {
//   clear_background(LIGHTGRAY);
  
//   let dati = vec![
//     data{input: vec![0.0, 0.0], output: vec![0.0]},
//     data{input: vec![1.0, 0.0], output: vec![1.0]},
//     data{input: vec![0.0, 1.0], output: vec![1.0]},
//     data{input: vec![1.0, 1.0], output: vec![0.0]}
//   ];

//   // let mut network = Network::new(vec![2, 2, 1]);
  
//   for _ in 0..100 {
//     let i = (fastrand::f32() * 4.0f32) as usize;
//     network.train( &dati[i].input, &dati[i].output, 0.2);
//   }

//   let rect_size = screen_height() / GRID_SIZE as f32;

//   // print
//   // info!("===========");
  
//   for row in 0..GRID_SIZE {
//     for col in 0..GRID_SIZE {
//       let input = vec![col as f32 / (GRID_SIZE-1) as f32, row as f32 / (GRID_SIZE-1) as f32];

//       // info!("prova: {:?}", input);

//       let output = network.feed_forward(&input).to_array();
//       let output = output[0];

//       // info!("{}", output);
      
//       let color = color::Color::new(output,output,output, 1.0);
//       // let color = if output > 0.5 { RED } else { BLUE };

//       // info!("{:?}", color);
      
//       draw_rectangle(rect_size * col as f32, rect_size * row as f32, rect_size, rect_size, color);
//     }
//   }
// }
