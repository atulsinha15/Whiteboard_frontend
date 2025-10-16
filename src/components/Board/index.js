import { useContext, useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";
function Board() {
  const canvasRef = useRef();
  const { toolActionType,elements,boardMouseDownHandler,boardMouseMoveHandler,boardMouseUpHandler } = useContext(boardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

 useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleMouseDown=(event)=>{
    boardMouseDownHandler(event);
  }
  const handleMouseMove=(event)=>{
    if (toolActionType===TOOL_ACTION_TYPES.DRAWING) {
      
      boardMouseMoveHandler(event);
    }
  }
  const handleMouseUp=()=>{
    boardMouseUpHandler();
  }
  return (
    <div className="Board">
      <canvas ref={canvasRef} 
      onMouseDown={handleMouseDown} 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      />
      {/* <h1>My whiteboard app</h1> */}
    </div>
  );
}

export default Board;
