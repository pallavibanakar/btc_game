export interface GameData {
  price: number;
  score: number;
  canGuess: boolean;
  timer: number;
  startTime?: number;
  message?: string | undefined;
}
