export enum Status {
  Run,
  Stop,
  Pause
}
export enum Step {
  Focus,
  Break
}

export interface Focus {
  pauseTime: number,
  seconds: number | null,
  step: Step
  status: Status
  focusId: NodeJS.Timeout | null
}
