
import React from "react";
import Sketch from "react-p5";

import { Point, f } from "../nn_lib/Point";
import { Network } from "../nn_lib/Network";

function LinearTest() {
  let points: Point[] = new Array(200);
  let x = 50;
  let y = 50;
  let p = new Network([2, 1]);
  let trainIndex = 0;

  const setup = (p5: any, canvasParentRef: any) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(600, 600).parent(canvasParentRef);

    for (let i = 0; i < points.length; i++) {
      points[i] = new Point(undefined, undefined);
    }
  };

  const draw = (p5: any) => {
    /* p5.strokeWeight(4); */
    p5.background(255);
    /* p5.line(0,600,600,0) */    
    // f () è la funzione esatta
    let p1: Point = new Point(-1, f(-1))
    let p2: Point = new Point(1, f(1))
    p5.line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
    /* p5.line( 600, 0, 0,600) */

// linea che prova ad indovinare 

    let p3: Point = new Point(-1, p.guessY(-1))
    let p4: Point = new Point(1, p.guessY(1))
    p5.line(p3.getX(), p3.getY(), p4.getX(), p4.getY());


    for (let i = 0; i < points.length; i++) {
      const inputs = [points[i].x, points[i].y];
      const target = points[i].label;

      let guess = Math.sign(p.feedForward(inputs).toArray()[0] * 2 -1);
      
      // il label è sempre 1 o -1
      if (guess == target) {  
        // se prov ad indovinare ed è giusto bene coloro di verde
        p5.fill(0, 255, 0); // verde
      } else {
        // se invece è sbagliato coloro di rosso
        p5.fill(255, 0, 0); // ross0
      }
      p5.ellipse(points[i].getX(), points[i].getY(), 16, 16);
    }

    let training = points[trainIndex];
    const inputs = [training.x, training.y];
    const target = training.label;
    p.train(inputs, [target], 0.1);
    trainIndex++;
    if (trainIndex == points.length) {
      trainIndex = 0;
      // console.log(p.we)
      
    }
  };

  return <Sketch setup={setup} draw={draw} className="prova" />;
}

export default LinearTest;
