import { useReducer } from "react";
import boardContext from "./board-context";
import { TOOL_ITEMS, BOARD_ACTIONS, TOOL_ACTION_TYPES } from "../constants";
import rough from "roughjs/bin/rough";
const gen = rough.generator();

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
        id: state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughEle: gen.line(clientX, clientY, clientX, clientY),
      };
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...prevElements, newElement],
      };
    }

    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const index = state.elements.length - 1;
      const newElement = [...state.elements];
      newElement[index].x2 = clientX;
      newElement[index].y2 = clientY;
      newElement[index].roughEle = gen.line(
        newElement[index].x1,
        newElement[index].y1,
        clientX,
        clientY
      );
      return {
        ...state,
        elements: newElement,
      };
    }

    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
       
      };
    }

    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  //useReducer for complex state boardState
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: {
        tool,
      },
    });
  };

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseUpHandler = () => {
  
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
      
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,

    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };
  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
