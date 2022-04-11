import React, { useEffect } from 'react';
import Sketch from 'react-p5/@types';
import './App.scss';
import { xorTest } from './nn_lib/test'

function App() {
  useEffect(() => {
    xorTest()
  }, [])

  const setup = (p5: any, canvasParentRef: any) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(600, 600).parent(canvasParentRef);
    /* let nn = new NeuralNetwork(2,2,1) */
  };


  const draw = (p5: any) => {
    
  
  };
  
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
}

export default App;
