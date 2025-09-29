import { useEffect, useRef } from "react";
import rough from 'roughjs';
function Board() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
     const roughCanvas =rough.canvas(canvas);
     const generator =roughCanvas.generator;

     let rec1=generator.rectangle(10,10,100,100);
     let rec2=generator.rectangle(10,120,100,100,{fill: "red"});

     roughCanvas.draw(rec1);
     roughCanvas.draw(rec2);
     

  }, []);

  return (
    <div className="Board">
      <canvas ref={canvasRef} />
      {/* <h1>My whiteboard app</h1> */}
    </div>
  );
}

export default Board;
