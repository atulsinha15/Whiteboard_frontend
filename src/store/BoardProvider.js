import { useReducer } from "react";
import boardContext from "./board-context";
import { TOOL_ITEMS,BOARD_ACTIONS } from "../constants";
import rough from "roughjs/bin/rough"
const gen=rough.generator();

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY } = action.payload;
      const newElement = {
        id:state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughEle: gen.line(clientX,clientY,clientX,clientY),
      };
      const prevElements = state.elements;
      return {
        ...state,
        elements: [...prevElements, newElement],
      };
    }
    
    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  elements: [],
};

const BoardProvider = ({ children }) => {
  //useReducer for complex state boardState
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const handleToolItemClick = (tool) => {
    dispatchBoardAction({
      type:BOARD_ACTIONS.CHANGE_TOOL,
      payload:{
        tool,
      }
    });
  };

  const boardMouseDownHandler=(event)=>{
    const {clientX,clientY}=event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload:{
        clientX,
        clientY,
      }
    });
  }

  const boardContextValue = {
    activeToolItem:boardState.activeToolItem,
    elements:boardState.elements,
    handleToolItemClick,
    boardMouseDownHandler,
  };
  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
