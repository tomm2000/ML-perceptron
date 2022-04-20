
export function f(x: number){
  return (0.3 * x) + 0.2
  /* return x */
}

export class Point{
  x: number
  y: number
  label: number
  b: number

  constructor(x?: number, y?: number){
    if(x == undefined ||  y == undefined){
      this.x= (Math.random()*2)-1
      this.y= (Math.random()*2)-1
      this.b= 1
    }else{
      this.x = x;
      this.y = y;
      this.b= 1
    }
    // deve cambiare a seconda di che funzione c'è
    let lineY = f(this.x);
    /* console.log("f(x)=" ,lineY) */
    /* console.log(y > lineY) */
    if(this.y > lineY){
      this.label = 1;
    }else {
      this.label= -1
    }
  }


  getX = () =>{
    return map(this.x, -1, 1, 0, 600);
  }
  getY = () =>{
    return map(this.y, -1, 1, 600, 0 );
  }
  
 
}
function map(n: number, start1: number, stop1: number, start2: number, stop2: number) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};