export enum GameControllerCommands {
  LEFT,
  CENTER,
  RIGHT,
  FORWARD,
  STOP,
  BACKWARD
}

export interface GameController {
  execute: (command: GameControllerCommands) => void;
}

