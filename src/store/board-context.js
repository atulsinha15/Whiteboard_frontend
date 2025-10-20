import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  elements: [],
  toolActionType: "",
  history: [[]],
  index: 0,
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  textAreaBlurHandler: () => {},
});

export default boardContext;
