//- NODE MODULES -------------------------------------------------
import express from 'express'
import cors from 'cors'
import fs from 'fs' 

import { Remarkable } from 'remarkable'
import 'dotenv/config'
//----------------------------------------------------------------

//- FILE IMPORTS -------------------------------------------------
import { path } from './config/const.js'
import { openRoutes } from './helpers/routeAPI.js';
import { findFiles } from './helpers/fileFinderAPI.js';
import chalk from 'chalk';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//----------------------------------------------------------------

//- EXPRESS SERVER -----------------------------------------------

const app = express();
const port = process.env.PORT || 3000

app.use(cors());

// app.listen(port, () => {
//   return console.log(chalk.blue('[INFO]'), `server is listening on ${port}`)
// });

(global as any).home_dir = __dirname
//----------------------------------------------------------------

import { Network } from './nn_lib/Network.js'

type setType = {
  training: { input: number[], output: number[] }[],
  test: { input: number[], output: number[] }[]
}

import mnist from 'mnist'

var set: setType = mnist.set(100, 10);
let network = new Network([784, 100, 30, 10]);

var trainingSet = set.training;
var testSet = set.test;

// let tmp = []
// for(let i = 0; i < 28; i++) {
//   tmp.push([])
//   for(let j = 0; j < 28; j++) {
//     // tmp[i][j] = Math.ceil(trainingSet[0].input[i * 28 + j])
//     tmp[i][j] = trainingSet[0].input[i * 28 + j] == 0 ? '.' : '#'
//   }
// }
// console.table(tmp)

console.time('training')
for(let data of trainingSet) {
  network.train(data.input, data.output, 0.01);
}
console.timeEnd('training')

console.time('test')
for(let data of testSet) {
  let error = network.feedForward(data.input);
  console.log(error.toString());
}
// network.feedForward(testSet[0].input);
console.timeEnd('test')





// const network = new Network([2, 4, 1]);

// const training_data = [
//   { input: [0, 0], output: [0] },
//   { input: [1, 0], output: [1] },
//   { input: [0, 1], output: [1] },
//   { input: [1, 1], output: [0] },
// ]

// for(let i = 0; i < 10000; i++) {
//   let data = training_data[Math.floor(Math.random() * training_data.length)]
//   network.train(data.input, data.output, 0.2);
// }

// for(let data of training_data) {
//   console.log(network.feedForward(data.input).toString())
// }
