import React from 'react';
import { Network } from '../nn_lib/Network';
import Sketch from "react-p5";

import '../assets/styles/xor.scss'

const XorExample = () => {
  const learning_data = [
    {
      inputs: [0,0],
      targets: [0]
    },
    {
      inputs: [1,1],
      targets: [0]
    },
    {
      inputs: [0,1],
      targets: [1]
    },
    {
      inputs: [1,0],
      targets: [1]
    }
  ]
  
  let network = new Network([2, 4, 1]);

  const reset = () => {
    network = new Network([2, 4, 1]);
  }

  const setup = (p5: any, canvasParentRef: any) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(600, 600).parent(canvasParentRef);
  };

  const draw = (p5: any) => {   
    for(let i = 0; i < 25; i++ ){
      let o = Math.floor(Math.random() * 4);
      network.train(learning_data[o].inputs, learning_data[o].targets, 0.5)
    }
    p5.background(0)
    let resolution = 10

    let clos = Math.floor(p5.width / resolution );
    let rows = Math.floor(p5.height / resolution);

    for (let i = 0; i< clos ; i++){
      for (let j = 0; j< rows; j++){
        let x = i * resolution 
        let y = j * resolution
        let input_1 = i / (clos -1);
        let input_2 = j / (rows -1);
        let output = network.feedForward([input_1, input_2]);
        let col = output.toArray()[0] * 255;
        p5.fill(col);
        p5.noStroke();
        p5.rect(x, y, resolution, resolution);
      }
    }
  };

  return (
    <div className="xor-wrap">
      <Sketch setup={setup} draw={draw} className="sketch" />
      <div className="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique reprehenderit vero nisi enim minima animi dignissimos quaerat labore ad in saepe velit voluptate amet veniam laborum officiis fugit, sunt reiciendis?
      </div>
      <div className="reset-btn" onClick={reset}>
        Reset
      </div>
    </div>
  );
};

export default XorExample;