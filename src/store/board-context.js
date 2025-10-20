import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  elements: [],
  toolActionType: "",
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
      textAreaBlurHandler:() => {},

});

export default boardContext;
