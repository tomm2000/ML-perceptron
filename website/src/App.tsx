import React, { useEffect } from 'react';
import './App.scss';

import P5 from 'p5'
import Sketch from 'react-p5';
import { gridScale, gridScaleCoords, gridToIndex, indexToGrid, train, test, predict } from './nn_lib/test';

function App() {

  const size = 280
  const data_size = 28
  const data_size2 = data_size * data_size
  const scale = size / data_size
  const scale2 = scale * scale
  
  const [scaledPixels, setScaledPixels] = React.useState(new Array(data_size2).fill(0))
  const [guess, setGuess] = React.useState(0)

  let cycle = 0

  const setupFull = (p5: P5, canvasParentRef: any) => {
    p5.createCanvas(size, size).parent(canvasParentRef);
    p5.background(255)
    p5.strokeWeight(0)
  };

  const drawFull = (p5: P5) => {
    cycle++

    if(cycle % 60 === 0) {
      let data = p5.get()
  
      data.loadPixels()
      let pixels = data.pixels

      let scaled_pixels = new Array(data_size2).fill(0)

      for(let i = 0; i < scaled_pixels.length; i++) {
        let sum = 0
        for(let j = 0; j < scale2; j++) {
          let scaled_coords = indexToGrid(i, data_size)
          let inside_coords = indexToGrid(j, scale)

          let coords = gridScaleCoords(scaled_coords, inside_coords, scale)

          let index = gridToIndex(coords.x, coords.y, data_size * scale)
          sum += pixels[index * 4]
        }

        scaled_pixels[i] = 1 - (sum / scale2 / 255)
      }
      setScaledPixels(scaled_pixels)

      setGuess(predict(scaledPixels))
    }


    if(p5.mouseIsPressed) {
      if(p5.mouseButton == p5.LEFT) {
        p5.fill(0)
        p5.circle(p5.mouseX, p5.mouseY, 28)
      } else {
        p5.fill(255)
        p5.circle(p5.mouseX, p5.mouseY, 56)
      }
    }

  };
  

  const setupScale = (p5: P5, canvasParentRef: any) => {
    p5.createCanvas(size, size).parent(canvasParentRef);
    p5.strokeWeight(0)
  };


  const drawScale = (p5: P5) => {
    
    for(let i = 0; i < scaledPixels.length; i++) {
      let x = i % data_size
      let y = Math.floor(i / data_size)
      let value = scaledPixels[i]
      p5.fill(255 - value * 255)
      p5.rect(x * scale, y * scale, scale, scale)
    }
  
  };

  return (
    <div className="App">
      <Sketch className="sketch" setup={setupFull} draw={drawFull} />
      <Sketch className="sketch" setup={setupScale} draw={drawScale} />
      <button onClick={train}>train</button>
      <button onClick={test}>test</button>
      <div className="guess">guess: {guess}</div>
    </div>
  );
}

export default App;
