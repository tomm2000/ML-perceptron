import { Network } from "./Network";

export function xorTest() {
  const network = new Network([2, 3, 1]);

  const training_data = [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
    { input: [0, 1], output: [1] },
    { input: [1, 1], output: [0] },
  ]

  for(let i = 0; i < 10000; i++) {
    let data = training_data[Math.floor(Math.random() * training_data.length)]
    network.train(data.input, data.output, 0.2);
  }

  for(let data of training_data) {
    console.log(network.feedForward(data.input).toString())
  }
}