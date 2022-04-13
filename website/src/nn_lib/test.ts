import { getMaxIndex, loadMNIST, prepareRandomData } from "../lib/mnist";
import { Network } from "./Network";


const network = new Network([784, 100, 10]);

export async function train() {
  let mnist = await loadMNIST()

  let training = prepareRandomData(mnist.train_images, mnist.train_labels, 1000);

  console.log('training begin')
  console.time("train");
  for(let data of training) {
    network.train(data.input, data.output, 0.1);
  }
  console.timeEnd("train");
}

export async function test() {
  let mnist = await loadMNIST()

  let testing = prepareRandomData(mnist.test_images, mnist.test_labels, 100);

  let correct = 0;
  for(let data of testing) {
    let output = network.feedForward(data.input).toArray();
    let maxIndex = getMaxIndex(output);
    if(maxIndex == getMaxIndex(data.output)) {
      correct++;
    }
  }

  console.log('correct: ' + correct / testing.length * 100 + "%");
}

export function predict(data: number[]): number {
  return getMaxIndex(network.feedForward(data).toArray());
}

export function indexToGrid(index: number, size: number) {
  return { x: Math.floor(index / size), y: index % size };
}

export function gridToIndex(x: number, y: number, size: number) {
  return x * size + y;
}

export function gridScale(x1: number, y1: number, x2: number, y2: number, scale: number) {
  let x = x1 * scale + x2
  let y = y1 * scale + y2
  return { x, y };
}

export function gridScaleCoords(p1: {x: number, y: number}, p2: {x: number, y: number}, scale: number) {
  let x = p1.x * scale + p2.x
  let y = p1.y * scale + p2.y
  return { x, y };
}