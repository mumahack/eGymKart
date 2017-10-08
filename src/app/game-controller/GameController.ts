export enum GameControllerCommands {
  LEFT,
  CENTER,
  RIGHT,
  A_BUTTON,
  A_BUTTON_RELEASE,
  BACKWARD
}

export interface GameController {
  execute: (command: GameControllerCommands) => void;
}

