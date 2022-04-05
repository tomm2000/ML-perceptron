pub mod matrix;
pub mod network;

use network::network::Network;
use macroquad::{prelude::*};

use std::vec;

#[macroquad::main("nn")]
async fn main() {
  let mut network = Network::new(vec![2, 2, 1]);
  network.display();

  for _ in 0..10000 {
    let choice = (fastrand::f32() * 4.0f32) as i32;

    if choice == 0 {
      network.train(&vec![0.0, 0.0], &vec![0.0], 0.2);
    } else if choice == 1 {
      network.train(&vec![1.0, 0.0], &vec![1.0], 0.2);
    } else if choice == 2 {
      network.train(&vec![0.0, 1.0], &vec![1.0], 0.2);
    } else if choice == 3 {
      network.train(&vec![1.0, 1.0], &vec![0.0], 0.2);
    }
  }
  
  println!("f: {} ", network.feed_forward(&vec![0.0, 0.0]));
  println!("t: {} ", network.feed_forward(&vec![1.0, 0.0]));
  println!("t: {} ", network.feed_forward(&vec![0.0, 1.0]));
  println!("f: {} ", network.feed_forward(&vec![1.0, 1.0]));

  loop {
    clear_background(LIGHTGRAY);

    draw_line(40.0, 40.0, 100.0, 200.0, 15.0, BLUE);
    draw_rectangle(screen_width() / 2.0 - 60.0, 100.0, 120.0, 60.0, GREEN);
    draw_circle(screen_width() - 30.0, screen_height() - 30.0, 15.0, YELLOW);

    draw_text("HELLO", 20.0, 20.0, 30.0, DARKGRAY);


    next_frame().await;

    // info!("TEST")
  }
}

#[no_mangle]
extern "C" fn func(value: ) {
  // let a = Vec::from(value);
  info!("{:?}", value)
}
